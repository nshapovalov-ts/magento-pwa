import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Form } from 'informed';
import { func, shape, string } from 'prop-types';

import { useStyle } from '@magento/venia-ui/lib/classify';
import { isRequired } from '@magento/venia-ui/lib/util/formValidators';
import { useSignIn } from '@magento/peregrine/lib/talons/SignIn/useSignIn';

import Field from '@magento/venia-ui/lib/components/Field';
import FormError from '@magento/venia-ui/lib/components/FormError/formError';
import LinkButton from '@magento/venia-ui/lib/components/LinkButton';
import LoadingIndicator from '@magento/venia-ui/lib/components/LoadingIndicator';
import Password from '@magento/venia-ui/lib/components/Password';
import { GET_CART_DETAILS_QUERY } from '@magento/venia-ui/lib/components/SignIn/signIn.gql';
import Button from 'components/Button';
import TextInput from 'components/TextInput';

import defaultClasses from './signInForm.module.css';

const SignIn = props => {
    const classes = useStyle(defaultClasses, props.classes);
    const {
        setDefaultUsername,
        showCreateAccount,
        showForgotPassword,
        initialValues
    } = props;
    const { formatMessage } = useIntl();

    const talonProps = useSignIn({
        getCartDetailsQuery: GET_CART_DETAILS_QUERY,
        setDefaultUsername,
        showCreateAccount,
        showForgotPassword
    });

    const {
        errors,
        handleCreateAccount,
        handleForgotPassword,
        handleSubmit,
        isBusy,
        setFormApi
    } = talonProps;

    if (isBusy) {
        return (
            <div className={classes.modal_active}>
                <LoadingIndicator>
                    <FormattedMessage
                        id={'signIn.loadingText'}
                        defaultMessage={'Signing In'}
                    />
                </LoadingIndicator>
            </div>
        );
    }

    return (
        <div data-cy="SignIn-root" className={classes.root}>
            <span>
                <FormattedMessage
                    id={'signIn.description'}
                    defaultMessage="If you have an account, sign in with your email address."
                />
            </span>
            <FormError errors={Array.from(errors.values())} />
            <Form
                getApi={setFormApi}
                className={classes.form}
                onSubmit={handleSubmit}
                data-cy="SignIn-form"
                initialValues={initialValues && initialValues}
            >
                <Field
                    label={formatMessage({
                        id: 'signIn.emailAddressText',
                        defaultMessage: 'Email'
                    })}
                >
                    <TextInput
                        data-cy="SignIn-email"
                        autoComplete="email"
                        field="email"
                        validate={isRequired}
                    />
                </Field>
                <Password
                    data-cy="SignIn-password"
                    fieldName="password"
                    label={formatMessage({
                        id: 'signIn.passwordText',
                        defaultMessage: 'Password'
                    })}
                    validate={isRequired}
                    autoComplete="current-password"
                    isToggleButtonHidden={false}
                />
                <div className={classes.forgotPasswordButtonContainer}>
                    <LinkButton
                        className={classes.linkButton}
                        type="button"
                        onClick={handleForgotPassword}
                        data-cy="SignIn-forgotPasswordButton"
                    >
                        <FormattedMessage
                            id={'signIn.forgotPasswordText'}
                            defaultMessage={'Forgot Your Password?'}
                        />
                    </LinkButton>
                </div>
                <div className={classes.buttonsContainer}>
                    <Button
                        variant="contained"
                        type="submit"
                        data-cy="SignInButton-root_highPriority"
                        className={classes.signInButton}
                    >
                        <FormattedMessage
                            id={'signIn.signInText'}
                            defaultMessage={'Sign In'}
                        />
                    </Button>
                </div>
                <span>
                    <FormattedMessage
                        id={'signIn.signUpDescription'}
                        defaultMessage={"Don't have an account yet?"}
                    />
                    <LinkButton
                        className={classes.linkButton}
                        type="button"
                        onClick={handleCreateAccount}
                        data-cy="SignIn-SignInLink"
                    >
                        Sign Up
                    </LinkButton>
                </span>
            </Form>
        </div>
    );
};

export default SignIn;
SignIn.propTypes = {
    classes: shape({
        buttonsContainer: string,
        form: string,
        linkButton: string,
        forgotPasswordButtonContainer: string,
        root: string,
        title: string,
        signInButton: string
    }),
    setDefaultUsername: func,
    showCreateAccount: func,
    showForgotPassword: func,
    initialValues: shape({
        email: string.isRequired
    })
};
SignIn.defaultProps = {
    setDefaultUsername: () => {},
    showCreateAccount: () => {},
    showForgotPassword: () => {}
};
