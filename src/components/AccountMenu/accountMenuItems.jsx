import React, { useCallback } from 'react';
import { LogOut } from 'react-feather';
import { FormattedMessage } from 'react-intl';
import { Link, useLocation } from 'react-router-dom';
import { func, shape, string } from 'prop-types';

import Icon from '@magento/venia-ui/lib/components/Icon';

import { useStyle } from '@magento/venia-ui/lib/classify';
import { useAccountMenuItems } from '@magento/peregrine/lib/talons/AccountMenu/useAccountMenuItems';

import defaultClasses from './accountMenuItems.module.css';

const AccountMenuItems = props => {
    const { onSignOut } = props;

    const talonProps = useAccountMenuItems({ onSignOut });
    const { handleSignOut, menuItems } = talonProps;
    const location = useLocation();
    const classes = useStyle(defaultClasses, props.classes);

    const isMenuActive = useCallback(
        path => {
            if (!path) return false;

            return location.pathname === path;
        },
        [location.pathname]
    );

    const menu = menuItems.map(item => {
        const activeMenu = isMenuActive(item.url);

        return (
            <Link
                key={item.name}
                to={item.url}
                className={activeMenu ? classes.activeLink : classes.link}
            >
                {item.icon && <Icon src={item.icon} size={20} />}
                {item.name}
            </Link>
        );
    });

    return (
        <div className={classes.root} data-cy="accountMenuItems-root">
            {menu}
            <button
                className={classes.signOut}
                onClick={handleSignOut}
                type="button"
                data-cy="accountMenuItems-signOut"
            >
                <Icon src={LogOut} size={20} />
                <FormattedMessage
                    id={'accountMenu.signOutButtonText'}
                    defaultMessage={'Sign Out'}
                />
            </button>
        </div>
    );
};

export default AccountMenuItems;

AccountMenuItems.propTypes = {
    classes: shape({
        link: string,
        signOut: string
    }),
    onSignOut: func
};
