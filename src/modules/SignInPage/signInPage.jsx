import React from 'react';
import { useIntl } from 'react-intl';
import { shape, string } from 'prop-types';

import { useStyle } from '@magento/venia-ui/lib/classify';
import { useSignInPage } from '@magento/peregrine/lib/talons/SignInPage/useSignInPage';

import { StoreTitle } from '@magento/venia-ui/lib/components/Head';
import Image from '@magento/venia-ui/lib/components/Image';
import SignIn from './SignInForm';

import signInImage from 'static/welcome_back.png';
import defaultClasses from './signInPage.module.css';

const SignInPage = props => {
    const classes = useStyle(defaultClasses, props.classes);
    const { signInProps } = useSignInPage(props);
    const { formatMessage } = useIntl();

    return (
        <div className={classes.root}>
            <StoreTitle>
                {formatMessage({
                    id: 'signInPage.title',
                    defaultMessage: 'Sign In'
                })}
            </StoreTitle>
            <div className={classes.imageContainer}>
                <Image
                    alt={formatMessage({
                        id: 'signInPage.title',
                        defaultMessage: 'Sign In'
                    })}
                    src={signInImage}
                    title={formatMessage({
                        id: 'signInPage.title',
                        defaultMessage: 'Sign In'
                    })}
                    width={160}
                    height={160}
                    ratio={0.8}
                />
            </div>
            <h1 className={classes.header}>Welcome back!</h1>
            <div className={classes.contentContainer}>
                <SignIn {...signInProps} />
            </div>
        </div>
    );
};

SignInPage.defaultProps = {
    createAccountPageUrl: '/create-account',
    forgotPasswordPageUrl: '/forgot-password',
    signedInRedirectUrl: '/order-history'
};

SignInPage.propTypes = {
    classes: shape({
        root: string,
        header: string,
        contentContainer: string
    }),
    createAccountPageUrl: string,
    forgotPasswordPageUrl: string,
    signedInRedirectUrl: string
};

export default SignInPage;
