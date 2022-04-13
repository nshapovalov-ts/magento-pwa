import { useCallback, useEffect, useMemo, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';

import defaultOperations from './addressBookPage.gql';

import { useAppContext } from '@magento/peregrine/lib/context/app';
import { useUserContext } from '@magento/peregrine/lib/context/user';
import mergeOperations from '@magento/peregrine/lib/util/shallowMerge';

/**
 *  A talon to support the functionality of the create/edit address custom page.
 *
 *  @function
 *
 *  @param {Object} props
 *  @param {Object} props.operations - GraphQL operations to be run by the talon.
 *  @param {Function} props.onSubmit the post submit callback
 *
 *  @returns {EditAddressTalonProps}
 *
 */
export const useAddress = (props = {}) => {
    const { onSubmit } = props;
    const operations = mergeOperations(defaultOperations, props.operations);
    const {
        createCustomerAddressMutation,
        getCustomerAddressesQuery,
        updateCustomerAddressMutation
    } = operations;

    const [
        ,
        {
            actions: { setPageLoading }
        }
    ] = useAppContext();
    const [{ isSignedIn }] = useUserContext();

    const { data: customerAddressesData, loading } = useQuery(getCustomerAddressesQuery, {
        fetchPolicy: 'cache-and-network',
        skip: !isSignedIn
    });

    const isRefetching = !!customerAddressesData && loading;
    const customerAddresses =
        (customerAddressesData &&
            customerAddressesData.customer &&
            customerAddressesData.customer.addresses) ||
        [];

    const [
        createCustomerAddress,
        { error: createCustomerAddressError, loading: isCreatingCustomerAddress }
    ] = useMutation(createCustomerAddressMutation);
    const [
        updateCustomerAddress,
        { error: updateCustomerAddressError, loading: isUpdatingCustomerAddress }
    ] = useMutation(updateCustomerAddressMutation);

    const [isEditMode, setIsEditMode] = useState(false);
    const [formAddress, setFormAddress] = useState({
        country_code: process.env.DEFAULT_COUNTRY_CODE
    });

    // Use local state to determine whether to display errors or not.
    // Could be replaced by a "reset mutation" function from apollo client.
    // https://github.com/apollographql/apollo-feature-requests/issues/170
    const [displayError, setDisplayError] = useState(false);

    // Update the page indicator if the GraphQL query is in flight.
    useEffect(() => {
        setPageLoading(isRefetching);
    }, [isRefetching, setPageLoading]);

    const handleEditAddress = useCallback(address => {
        // Hide all previous errors when we open the dialog.
        setDisplayError(false);

        setIsEditMode(true);
        setFormAddress(address);
    }, []);

    const handleConfirm = useCallback(
        async formValues => {
            if (isEditMode) {
                try {
                    await updateCustomerAddress({
                        variables: {
                            addressId: formAddress.id,
                            updated_address: {
                                ...formValues,
                                // Sends value as empty if none are provided
                                middlename: formValues.middlename || '',
                                // Cleans up the street array when values are null or undefined
                                street: formValues.street.filter(e => e)
                            }
                        },
                        refetchQueries: [{ query: getCustomerAddressesQuery }],
                        awaitRefetchQueries: true
                    });
                    if (onSubmit) {
                        onSubmit();
                    }
                } catch {
                    // Make sure any errors from the mutations are displayed.
                    setDisplayError(true);

                    // we have an onError link that logs errors, and FormError
                    // already renders this error, so just return to avoid
                    // triggering the success callback
                }
            } else {
                try {
                    await createCustomerAddress({
                        variables: {
                            address: {
                                ...formValues,
                                // Sends value as empty if none are provided
                                middlename: formValues.middlename || '',
                                // Cleans up the street array when values are null or undefined
                                street: formValues.street.filter(e => e)
                            }
                        },
                        refetchQueries: [{ query: getCustomerAddressesQuery }],
                        awaitRefetchQueries: true
                    });
                    if (onSubmit) {
                        onSubmit();
                    }
                } catch {
                    // Make sure any errors from the mutations are displayed.
                    setDisplayError(true);

                    // we have an onError link that logs errors, and FormError
                    // already renders this error, so just return to avoid
                    // triggering the success callback
                }
            }
        },
        [
            createCustomerAddress,
            formAddress,
            getCustomerAddressesQuery,
            isEditMode,
            updateCustomerAddress,
            onSubmit
        ]
    );

    const formErrors = useMemo(() => {
        if (displayError) {
            return new Map([
                ['createCustomerAddressMutation', createCustomerAddressError],
                ['updateCustomerAddressMutation', updateCustomerAddressError]
            ]);
        } else return new Map();
    }, [createCustomerAddressError, displayError, updateCustomerAddressError]);

    const isBusy = isCreatingCustomerAddress || isUpdatingCustomerAddress;
    const isLoadingWithoutData = !customerAddressesData && loading;

    const formProps = {
        initialValues: formAddress
    };

    return {
        customerAddresses,
        formErrors,
        formProps,
        handleConfirm,
        handleEditAddress,
        isBusy,
        isLoading: isLoadingWithoutData
    };
};

/**
 * Object type returned by the {@link useAddress} talon.
 * It provides props data to use when rendering the address create/edit page component.
 *
 * @typedef {Object} EditAddressTalonProps
 *
 * @property {Map} countryDisplayNameMap - A Map of country id to its localized display name.
 * @property {Array<Object>} customerAddresses - A list of customer addresses.
 * @property {Map} formErrors - A Map of form errors.
 * @property {Object} formProps - Properties to pass to the add/edit form.
 * @property {Function} handleAddAdddress - Function to invoke when adding a new address.
 * @property {Function} handleConfirm - Function to invoke when submitting the add/edit.
 * @property {Function} handleEditAddress - Function to invoke when editing an existing address.
 * @property {Boolean} isBusy - Whether actions inside the dialog should be disabled.
 * @property {Boolean} isEditMode - Whether the dialog is in edit mode (true) or add new mode (false).
 * @property {Boolean} isLoading - Whether the page is loading.
 */
