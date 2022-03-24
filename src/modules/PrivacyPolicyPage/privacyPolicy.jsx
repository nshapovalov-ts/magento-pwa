import React from 'react';
import { FormattedMessage } from 'react-intl';
import dompurify from 'dompurify';

import cookiePolicyHtml from './cookiePolicy.html';
import privacyPolicyHtml from './privacyPolicy.html';

import classes from './privacyPolicy.module.css';

const PrivacyPolicyPage = () => {
    const clearHtml = dompurify.sanitize;

    return (
        <article className={classes.root}>
            <h1 className={classes.title}>
                <FormattedMessage
                    id={'privacyPolicyPage.title'}
                    defaultMessage={'Tradesquare Pty Ltd Privacy Policy'}
                />
            </h1>
            <section
                className={classes.policyBlock}
                dangerouslySetInnerHTML={{
                    __html: clearHtml(privacyPolicyHtml)
                }}
            />
            <h1 className={classes.cookieTitle}>
                <FormattedMessage
                    id={'privacyPolicyPage.cookieTitle'}
                    defaultMessage={'Cookie policy'}
                />
            </h1>
            <section
                className={classes.policyBlock}
                dangerouslySetInnerHTML={{
                    __html: clearHtml(cookiePolicyHtml)
                }}
            />
        </article>
    );
};

export default PrivacyPolicyPage;
