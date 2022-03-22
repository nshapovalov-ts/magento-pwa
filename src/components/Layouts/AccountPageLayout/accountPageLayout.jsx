import React from 'react';

import { useAccountMenu } from '@magento/peregrine/lib/talons/Header/useAccountMenu';

import AccountMenuItems from 'components/AccountMenu/accountMenuItems';

import menuClasses from './accountMenu.module.css';
import classes from './accountPageLayout.module.css';

export const AccountPageLayout = ({ children }) => {
    const talonProps = useAccountMenu({
        accountMenuIsOpen: false,
        setAccountMenuIsOpen: () => {}
    });
    const { handleSignOut } = talonProps;

    return (
        <section className={classes.root}>
            <aside className={classes.menu}>
                <AccountMenuItems
                    classes={menuClasses}
                    onSignOut={handleSignOut}
                />
            </aside>
            <div className={classes.pageContent}>{children}</div>
        </section>
    );
};
