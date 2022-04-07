import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Form } from 'informed';

import Checkbox from '@magento/venia-ui/lib/components/Checkbox';
import Link from '@magento/venia-ui/lib/components/Link';
import LoadingIndicator from '@magento/venia-ui/lib/components/LoadingIndicator';
import Button from 'components/Button';
import Field from 'components/Field';
import TextInput from 'components/TextInput';

import { isRequired } from '@magento/venia-ui/lib/util/formValidators';
import { useSignUp } from '../../hooks/useSignUp';

import classes from './form.module.css';

const SignUpForm = () => {
    const { handleSubmit, isSubmitting } = useSignUp();
    const { formatMessage } = useIntl();

    return (
        <>
            {isSubmitting && <LoadingIndicator global />}

            <Form className={classes.form} onSubmit={handleSubmit}>
                <Field id="signup-firstname">
                    <TextInput
                        id="signup-firstname"
                        autoComplete="firstname"
                        field="firstname"
                        validate={isRequired}
                        mask={value => value && value.trim()}
                        maskOnBlur={true}
                        data-cy="firstname"
                        placeholder="First name*"
                    />
                </Field>

                <Field id="signup-email">
                    <TextInput
                        id="signup-email"
                        autoComplete="email"
                        field="email"
                        validate={isRequired}
                        mask={value => value && value.trim()}
                        maskOnBlur={true}
                        data-cy="email"
                        placeholder="Business email*"
                    />
                </Field>

                <div className={classes.submitButton}>
                    <Button
                        variant="contained"
                        type="submit"
                        fullWidth
                        size="large"
                        data-cy="submit"
                    >
                        <FormattedMessage
                            id={'signUpPage.formSubmitButton'}
                            defaultMessage={'Get Started'}
                        />
                    </Button>
                </div>
                <p className={classes.signIn}>
                    <FormattedMessage
                        id={'signUpPage.signInText'}
                        defaultMessage={'Already on TradeSquare?'}
                    />
                    <Link to="/sign-in">
                        <strong>Sign In</strong>
                    </Link>
                </p>
                <p className={classes.terms}>
                    <FormattedMessage
                        id={'signUpPage.terms'}
                        defaultMessage={
                            'By signing up TradeSquare, you`re agreeing to our {terms} of Service and {privacy}.'
                        }
                        values={{
                            terms: <Link to="/buyer-terms">Terms of Service</Link>,
                            privacy: <Link to="/privacy-policy">Privacy Policy</Link>
                        }}
                    />
                </p>
                <div className={classes.offers}>
                    <Field id="signup-checkbox">
                        <Checkbox
                            id="signup-checkbox"
                            field="offers_checkbox"
                            label={formatMessage({
                                id: 'signUpPage.checkboxLabel',
                                defaultMessage:
                                    'Join the TS Buying community - Be inspired by exclusive offers and updates.'
                            })}
                            data-cy="offers_checkbox"
                            initialValue={true}
                        />
                    </Field>
                </div>
            </Form>
        </>
    );
};

export default SignUpForm;
