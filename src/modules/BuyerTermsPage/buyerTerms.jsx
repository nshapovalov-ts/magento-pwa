import React from 'react';
import { FormattedMessage } from 'react-intl';

import RichContent from '@magento/venia-ui/lib/components/RichContent';
import { StaticPageLayout } from 'components/Layouts';
import buyerTermsHtml from './buyerTerms.html';
import { Disclaimer } from './disclaimer';

import classes from './buyerTerms.module.css';

const BuyerTerms = () => {
    return (
        <StaticPageLayout>
            <h1 className={classes.title}>
                <FormattedMessage
                    id={'buyerTermsPage.title'}
                    defaultMessage={'Buyer Terms and Conditions – TradeSquare'}
                />
            </h1>
            <Disclaimer />
            <RichContent classes={{ root: classes.terms }} html={buyerTermsHtml} />
        </StaticPageLayout>
    );
};

export default BuyerTerms;
