import React from 'react';

import Button from 'components/Button';
import AccountTrigger from './accountTrigger';
import CartTrigger from './cartTrigger';
import WishlistIcon from './wishlistIcon';

import { useStyle } from '@magento/venia-ui/lib/classify';
import { useUserContext } from '@magento/peregrine/lib/context/user';

import defaultClasses from './actionButtons.module.css';

const ActionButtons = props => {
    const classes = useStyle(defaultClasses, props.classes);
    const [{ isSignedIn }] = useUserContext();

    return (
        <div className={classes.actionButtons}>
            {isSignedIn && <WishlistIcon />}
            {isSignedIn && <CartTrigger />}
            {!isSignedIn && (
                <>
                    <Button className={classes.sellLink} component="link" to="/seller">
                        Sell with us
                    </Button>
                    <Button className={classes.loginButton} component="link" to="/sign-in">
                        Login
                    </Button>
                    <Button className={classes.signupButton} component="link" to="/sign-up">
                        Sign Up
                    </Button>
                </>
            )}
            {isSignedIn && <AccountTrigger />}
        </div>
    );
};

export default ActionButtons;
