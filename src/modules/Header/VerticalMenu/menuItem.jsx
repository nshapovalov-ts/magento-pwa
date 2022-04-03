import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Submenu from './submenu';

import { useStyle } from '@magento/venia-ui/lib/classify';
import { useMegaMenuItem } from '@magento/peregrine/lib/talons/MegaMenu/useMegaMenuItem';
import resourceUrl from '@magento/peregrine/lib/util/makeUrl';

import defaultClasses from './menuItem.module.css';

/**
 * The MenuItem component displays mega menu item
 *
 * @param {VerticalMenuCategory} props.category
 * @param {String} props.activeCategoryId - uid of active category
 * @param {int} props.mainNavWidth - width of the main nav. It's used for setting min-width of the submenu
 * @param {function} props.onNavigate - function called when clicking on Link
 */
const MenuItem = props => {
    const {
        activeCategoryId,
        category,
        mainNavWidth,
        categoryUrlSuffix,
        subMenuState,
        disableFocus,
        onNavigate,
        handleSubMenuFocus,
        handleClickOutside
    } = props;

    const classes = useStyle(defaultClasses, props.classes);
    const categoryUrl = resourceUrl(`/${category.url_path}${categoryUrlSuffix || ''}`);

    const talonProps = useMegaMenuItem({
        category,
        activeCategoryId,
        subMenuState,
        disableFocus
    });

    const {
        isFocused,
        isActive,
        handleMenuItemFocus,
        handleCloseSubMenu,
        isMenuActive,
        handleKeyDown
    } = talonProps;

    const menuItemClassname = isMenuActive ? classes.menuItem_active : classes.menuItem;

    const children = useMemo(() => {
        return category.children.length ? (
            <Submenu
                isFocused={isFocused}
                subMenuState={subMenuState}
                items={category.children}
                mainNavWidth={mainNavWidth}
                handleCloseSubMenu={handleCloseSubMenu}
                categoryUrlSuffix={categoryUrlSuffix}
                onNavigate={onNavigate}
            />
        ) : null;
    }, [
        category,
        isFocused,
        mainNavWidth,
        subMenuState,
        handleCloseSubMenu,
        categoryUrlSuffix,
        onNavigate
    ]);

    const linkAttributes = category.children.length
        ? {
              'aria-label': `Category: ${category.name}. ${category.children.length} sub-categories`
          }
        : {};

    return (
        <div
            className={menuItemClassname}
            data-cy="VerticalMenu-MenuItem"
            onMouseEnter={() => {
                handleSubMenuFocus();
                handleMenuItemFocus();
            }}
            onTouchStart={() => {
                handleSubMenuFocus();
                handleMenuItemFocus();
            }}
            onMouseLeave={e => {
                handleClickOutside(e);
                handleCloseSubMenu();
            }}
        >
            <Link
                {...linkAttributes}
                onKeyDown={handleKeyDown}
                className={isActive ? classes.menuLinkActive : classes.menuLink}
                data-cy="VerticalMenu-MenuItem-link"
                to={categoryUrl}
                onClick={onNavigate}
            >
                {category.name}
            </Link>
            {children}
        </div>
    );
};

export default MenuItem;

MenuItem.propTypes = {
    category: PropTypes.shape({
        children: PropTypes.array,
        uid: PropTypes.string.isRequired,
        include_in_menu: PropTypes.number,
        isActive: PropTypes.bool.isRequired,
        name: PropTypes.string.isRequired,
        path: PropTypes.array.isRequired,
        position: PropTypes.number.isRequired,
        url_path: PropTypes.string.isRequired
    }).isRequired,
    activeCategoryId: PropTypes.string,
    mainNavWidth: PropTypes.number.isRequired,
    categoryUrlSuffix: PropTypes.string,
    onNavigate: PropTypes.func.isRequired,
    handleSubMenuFocus: PropTypes.func.isRequired,
    handleClickOutside: PropTypes.func.isRequired
};
