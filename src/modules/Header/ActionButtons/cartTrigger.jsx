import React, { Fragment } from 'react';
import { ShoppingCart as ShoppingCartIcon } from 'react-feather';
import { useIntl } from 'react-intl';
import { shape, string } from 'prop-types';

import { useStyle } from '@magento/venia-ui/lib/classify';
import { Price } from '@magento/peregrine';
import { useCartTrigger } from '@magento/peregrine/lib/talons/Header/useCartTrigger';
import { useMiniCart } from '@magento/peregrine/lib/talons/MiniCart/useMiniCart';

import { GET_ITEM_COUNT_QUERY } from '@magento/venia-ui/lib/components/Header/cartTrigger.gql';
import Icon from '@magento/venia-ui/lib/components/Icon';
import minicartOperations from '@magento/venia-ui/lib/components/MiniCart/miniCart.gql.js';

import defaultClasses from './cartTrigger.module.css';

const CartTrigger = props => {
    const { handleLinkClick, itemCount, setMiniCartIsOpen } = useCartTrigger({
        queries: {
            getItemCountQuery: GET_ITEM_COUNT_QUERY
        }
    });

    const { subTotal, totalQuantity } = useMiniCart({
        setIsOpen: setMiniCartIsOpen,
        operations: minicartOperations
    });

    const classes = useStyle(defaultClasses, props.classes);
    const { formatMessage } = useIntl();
    const buttonAriaLabel = formatMessage(
        {
            id: 'cartTrigger.ariaLabel',
            defaultMessage: 'You have {count} items in your cart.'
        },
        { count: itemCount }
    );

    const itemCountDisplay = itemCount > 99 ? '99+' : itemCount;

    const itemCounter = itemCount ? (
        <span className={classes.counter} data-cy="CartTrigger-counter">
            {itemCountDisplay}
        </span>
    ) : null;

    const itemsWithSubtotal = subTotal ? (
        <span className={classes.subtotal}>
            {`${totalQuantity} items - `}
            <Price currencyCode={subTotal.currency} value={subTotal.value} />
        </span>
    ) : null;

    const cartTrigger = (
        <Fragment>
            <button
                aria-label={buttonAriaLabel}
                className={classes.root}
                onClick={handleLinkClick}
            >
                <Icon src={ShoppingCartIcon} />
                {itemCounter}
                {itemsWithSubtotal}
            </button>
        </Fragment>
    );

    return cartTrigger;
};

export default CartTrigger;

CartTrigger.propTypes = {
    classes: shape({
        counter: string,
        subTotal: string,
        root: string
    })
};
