import React from 'react';
import { Heart } from 'react-feather';
import { shape, string } from 'prop-types';

import { useStyle } from '@magento/venia-ui/lib/classify';
import { useWishlistPage } from '@magento/peregrine/lib/talons/WishlistPage/useWishlistPage';

import Icon from '@magento/venia-ui/lib/components/Icon';
import Link from '@magento/venia-ui/lib/components/Link';

import defaultClasses from './whishListIcon.module.css';

/**
 * The WishlistIcon component is the call to action in the site header
 * that show  the AccountMenu dropdown.
 *
 * @param {Object} props
 * @param {Object} props.classes - CSS classes to override element styles.
 */
const WishlistIcon = props => {
    const classes = useStyle(defaultClasses, props.classes);
    const { wishlists = [] } = useWishlistPage();

    const itemCount = wishlists[0]?.items_count;

    const itemCountDisplay = itemCount > 99 ? '99+' : itemCount;

    const itemCounter = itemCount ? (
        <span className={classes.counter} data-cy="WishList-counter">
            {itemCountDisplay}
        </span>
    ) : null;

    return (
        <Link to="/customer/wishlist">
            <div className={classes.root}>
                <Icon src={Heart} />
                {itemCounter}
            </div>
        </Link>
    );
};

export default WishlistIcon;

WishlistIcon.propTypes = {
    classes: shape({
        root: string
    })
};
