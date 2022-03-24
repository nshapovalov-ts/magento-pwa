import React from 'react';
import { FormattedMessage } from 'react-intl';

import classes from './buyerTerms.module.css';

export const Disclaimer = () => {
    return (
        <section className={classes.disclaimer}>
            <h2 className={classes.disclaimerTitle}>
                <FormattedMessage
                    id={'buyerTermsPage.disclaimerTitle'}
                    defaultMessage={'Important disclaimer'}
                />
            </h2>
            <p>
                <FormattedMessage
                    id={'buyerTermsPage.disclaimer'}
                    defaultMessage={
                        'The website {link} and any associated mobile applications constitute a marketplace to connect buyers and sellers. ' +
                        'TradeSquare is not the seller of products and services offered for sale on the website and is simply facilitating the ' +
                        'transaction through its website. We accept no legal to transactional risk associated with your purchase and accept no ' +
                        'responsibility placed on sellers under the law or otherwise. You are ineligible to purchase products and / or services ' +
                        'via out platforms if you are a seller or a wholesaler.'
                    }
                    values={{
                        link: (
                            <a className={classes.link} href="/">
                                www.tradesquare.com.au
                            </a>
                        )
                    }}
                />
            </p>
        </section>
    );
};
