import { useCallback, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';

// import { useMutation } from '@apollo/client';
// import { CONFIRM_EMAIL } from '../hooks/signUp.gql';
import { useFakePost } from 'common/hooks/useFakeFetch';

export const useSignUp = () => {
    const history = useHistory();
    const { path } = useRouteMatch();
    const [isSubmitting, setIsSubmitting] = useState(false);

    // const [sendEmail] = useMutation(CONFIRM_EMAIL);
    const { fakePost } = useFakePost();

    const handleSubmit = useCallback(
        async formValues => {
            setIsSubmitting(true);
            try {
                await fakePost(null, 2000);

                // await sendEmail({
                //     variables: {
                //         current_url: window.origin,
                //         email: formValues.email,
                //         firstname: formValues.firstname,
                //         offers_checkbox: !!formValues.offers_checkbox
                //     }
                // });

                history.push(`${path}/create`, {
                    firstname: formValues.firstname,
                    email: formValues.email,
                    is_subscribed: !!formValues.offers_checkbox
                });
            } catch (error) {
                if (process.env.NODE_ENV !== 'production') {
                    console.error(error);
                }
                setIsSubmitting(false);
            }
        },
        [fakePost, history, path]
    );

    return {
        handleSubmit,
        isSubmitting
    };
};
