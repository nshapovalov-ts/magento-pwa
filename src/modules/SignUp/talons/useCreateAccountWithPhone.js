import { useCallback, useMemo, useState } from 'react';
import { useApolloClient, useMutation } from '@apollo/client';

import { useCartContext } from '@magento/peregrine/lib/context/cart';
import { useUserContext } from '@magento/peregrine/lib/context/user';
import { useAwaitQuery } from '@magento/peregrine/lib/hooks/useAwaitQuery';
import { useGoogleReCaptcha } from '@magento/peregrine/lib/hooks/useGoogleReCaptcha';
import { retrieveCartId } from '@magento/peregrine/lib/store/actions/cart';
import { CREATE_ACCOUNT } from '../hooks/signUp.gql';
import DEFAULT_OPERATIONS from '@magento/peregrine/lib/talons/CreateAccount/createAccount.gql';

/**
 * Copy of original handleSubmit from useCreateAccount talon with
 * additional phone_number parameter used in createAccount mutation
 */

export const useCreateAccountWithPhone = props => {
    const { onSubmit } = props;
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        createCartMutation,
        getCartDetailsQuery,
        getCustomerQuery,
        mergeCartsMutation,
        signInMutation
    } = DEFAULT_OPERATIONS;
    const apolloClient = useApolloClient();

    const [{ cartId }, { createCart, removeCart, getCartDetails }] = useCartContext();
    const [{ isGettingDetails }, { getUserDetails, setToken }] = useUserContext();

    const [fetchCartId] = useMutation(createCartMutation);

    const [mergeCarts] = useMutation(mergeCartsMutation);

    // For create account and sign in mutations, we don't want to cache any
    // personally identifiable information (PII). So we set fetchPolicy to 'no-cache'.
    const [createAccount, { error: createAccountError }] = useMutation(CREATE_ACCOUNT, {
        fetchPolicy: 'no-cache'
    });

    const [signIn, { error: signInError }] = useMutation(signInMutation, {
        fetchPolicy: 'no-cache'
    });

    const fetchUserDetails = useAwaitQuery(getCustomerQuery);
    const fetchCartDetails = useAwaitQuery(getCartDetailsQuery);

    const { generateReCaptchaData, recaptchaLoading } = useGoogleReCaptcha({
        currentForm: 'CUSTOMER_CREATE',
        formAction: 'createAccount'
    });

    const handleSubmit = useCallback(
        async formValues => {
            setIsSubmitting(true);
            try {
                // Get source cart id (guest cart id).
                const sourceCartId = cartId;

                // Get reCaptchaV3 Data for createAccount mutation
                const recaptchaDataForCreateAccount = await generateReCaptchaData();

                // Create the account and then sign in.
                await createAccount({
                    variables: {
                        email: formValues.customer.email,
                        firstname: formValues.customer.firstname,
                        lastname: formValues.customer.lastname,
                        password: formValues.password,
                        phone_number: formValues.phone,
                        is_subscribed: !!formValues.subscribe
                    },
                    ...recaptchaDataForCreateAccount
                });

                // Get reCaptchaV3 Data for signIn mutation
                const recaptchaDataForSignIn = await generateReCaptchaData();

                const signInResponse = await signIn({
                    variables: {
                        email: formValues.customer.email,
                        password: formValues.password
                    },
                    ...recaptchaDataForSignIn
                });
                const { token } = signInResponse.data.generateCustomerToken;
                await setToken(token);

                // Clear all cart/customer data from cache and redux.
                await apolloClient.clearCacheData(apolloClient, 'cart');
                await apolloClient.clearCacheData(apolloClient, 'customer');
                await removeCart();

                // Create and get the customer's cart id.
                await createCart({
                    fetchCartId
                });
                const destinationCartId = await retrieveCartId();

                // Merge the guest cart into the customer cart.
                await mergeCarts({
                    variables: {
                        destinationCartId,
                        sourceCartId
                    }
                });

                // Ensure old stores are updated with any new data.
                await getUserDetails({ fetchUserDetails });
                await getCartDetails({
                    fetchCartId,
                    fetchCartDetails
                });

                // Finally, invoke the post-submission callback.
                if (onSubmit) {
                    onSubmit();
                }
            } catch (error) {
                if (process.env.NODE_ENV !== 'production') {
                    console.error(error);
                }
                setIsSubmitting(false);
            }
        },
        [
            cartId,
            generateReCaptchaData,
            createAccount,
            signIn,
            setToken,
            apolloClient,
            removeCart,
            createCart,
            fetchCartId,
            mergeCarts,
            getUserDetails,
            fetchUserDetails,
            getCartDetails,
            fetchCartDetails,
            onSubmit
        ]
    );

    const errors = useMemo(
        () =>
            new Map([['createAccountQuery', createAccountError], ['signInMutation', signInError]]),
        [createAccountError, signInError]
    );

    return {
        handleSubmit,
        errors,
        isDisabled: isSubmitting || isGettingDetails || recaptchaLoading
    };
};
