import React from 'react';
import { FormattedMessage } from 'react-intl';

import { Title } from '@magento/venia-ui/lib/components/Head';
import RichContent from '@magento/venia-ui/lib/components/RichContent';
import { ContentLayout } from 'components/Layouts';
import buyerTermsHtml from './buyerTerms.html';
import { Disclaimer } from './disclaimer';

import classes from './buyerTerms.module.css';

const BuyerTermsPage = () => {
    return (
        <>
            <Title>Term of Use</Title>
            <ContentLayout>
                <h1 className={classes.title}>
                    <FormattedMessage
                        id={'buyerTermsPage.title'}
                        defaultMessage={'Buyer Terms and Conditions – TradeSquare'}
                    />
                </h1>
                <Disclaimer />
                <RichContent classes={{ root: classes.terms }} html={buyerTermsHtml} />
            </ContentLayout>
        </>
    );
};

export default BuyerTermsPage;
