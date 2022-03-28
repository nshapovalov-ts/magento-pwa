import React from 'react';
import { FormattedMessage } from 'react-intl';

import RichContent from '@magento/venia-ui/lib/components/RichContent';
import { StaticPageLayout } from 'components/Layouts';
import cookiePolicyHtml from './cookiePolicy.html';
import privacyPolicyHtml from './privacyPolicy.html';

import classes from './privacyPolicy.module.css';

const PrivacyPolicyPage = () => {
    return (
        <StaticPageLayout>
            <h1 className={classes.title}>
                <FormattedMessage
                    id={'privacyPolicyPage.title'}
                    defaultMessage={'Tradesquare Pty Ltd Privacy Policy'}
                />
            </h1>
            <RichContent classes={{ root: classes.policyBlock }} html={privacyPolicyHtml} />

            <h1 className={classes.cookieTitle}>
                <FormattedMessage
                    id={'privacyPolicyPage.cookieTitle'}
                    defaultMessage={'Cookie policy'}
                />
            </h1>
            <RichContent classes={{ root: classes.policyBlock }} html={cookiePolicyHtml} />
        </StaticPageLayout>
    );
};

export default PrivacyPolicyPage;
