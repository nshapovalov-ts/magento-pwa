import React from 'react';
import { FormattedMessage } from 'react-intl';

import Link from '@magento/venia-ui/lib/components/Link';
import Account from './account';
import { ACCOUNT_DATA } from './accountData';

import classes from './zipAccounts.module.css';

const TextWithLink = ({ text }) => {
    return (
        <FormattedMessage
            id={'no.id'}
            defaultMessage={text}
            values={{
                here: (
                    <Link className={classes.link} to="/contact-us">
                        here
                    </Link>
                ),
                website: (
                    <Link
                        className={classes.linkUnderlined}
                        to={{
                            pathname:
                                'https://zip.co/au/business/trade?%24web_only=true&_branch_match_id=800950833557125779&utm_source=TradeSquare&utm_medium=marketing'
                        }}
                        target="_blank"
                    >
                        website
                    </Link>
                ),
                br: <br />
            }}
        />
    );
};

export const ZipAccounts = React.forwardRef((props, ref) => {
    return (
        <section className={classes.root} ref={ref}>
            <div className={classes.container}>
                <h2>
                    <TextWithLink text="It's that easy! Questions or need help?{br} Ask our customer success team ({here})" />
                </h2>
                <div className={classes.accountsBlock}>
                    <Account data={ACCOUNT_DATA[0]} />
                    <Account data={ACCOUNT_DATA[1]} />
                </div>
                <div className={classes.accountsDescription}>
                    <p>
                        <TextWithLink
                            text="Zip Business Trade and Trade Plus terms and conditions apply. See {website}
                        for more details. Credit approval criteria, fees and charges apply."
                        />
                    </p>
                </div>
            </div>
        </section>
    );
});

export default ZipAccounts;
