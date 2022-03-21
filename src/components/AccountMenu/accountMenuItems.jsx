import React from 'react';
import { LogOut } from 'react-feather';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { func, shape, string } from 'prop-types';

import { useStyle } from '@magento/venia-ui/lib/classify';
import { useAccountMenuItems } from '@magento/peregrine/lib/talons/AccountMenu/useAccountMenuItems';

import Icon from '@magento/venia-ui/lib/components/Icon';

import defaultClasses from './accountMenuItems.module.css';

const AccountMenuItems = props => {
    const { onSignOut } = props;

    const talonProps = useAccountMenuItems({ onSignOut });
    const { handleSignOut, menuItems } = talonProps;

    const classes = useStyle(defaultClasses, props.classes);

    const menu = menuItems.map(item => {
        return (
            <div key={item.name} className={classes.link}>
                {item.icon && <Icon src={item.icon} size={20} />}
                <Link to={item.url}>{item.name}</Link>
            </div>
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
