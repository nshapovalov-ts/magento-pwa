import React from 'react';
import { FormattedMessage } from 'react-intl';
import dompurify from 'dompurify';

import buyerTermsHtml from './buyerTerms.html';
import { Disclaimer } from './disclaimer';

import classes from './buyerTerms.module.css';

const BuyerTerms = () => {
    const clearHtml = dompurify.sanitize;

    return (
        <article className={classes.root}>
            <h1 className={classes.title}>
                <FormattedMessage
                    id={'buyerTermsPage.title'}
                    defaultMessage={'Buyer Terms and Conditions – TradeSquare'}
                />
            </h1>
            <Disclaimer />
            <section
                className={classes.terms}
                dangerouslySetInnerHTML={{ __html: clearHtml(buyerTermsHtml) }}
            />
        </article>
    );
};

export default BuyerTerms;
