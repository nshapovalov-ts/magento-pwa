import React, { useMemo } from 'react';
import { ChevronDown as ArrowDown } from 'react-feather';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Icon from '@magento/venia-ui/lib/components/Icon';
import Submenu from './submenu';

import { useStyle } from '@magento/venia-ui/lib/classify';
import { useMegaMenuItem } from '@magento/peregrine/lib/talons/MegaMenu/useMegaMenuItem';
import resourceUrl from '@magento/peregrine/lib/util/makeUrl';

import defaultClasses from './horizontalMenuItem.module.css';

/**
 * The HorizontalMenuItem component displays mega menu item
 *
 * @param {MegaMenuCategory} props.category
 * @param {String} props.activeCategoryId - uid of active category
 * @param {int} props.mainNavWidth - width of the main nav. It's used for setting min-width of the submenu
 * @param {function} props.onNavigate - function called when clicking on Link
 */
const HorizontalMenuItem = props => {
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

    const horizontalMenuItemClassname = isMenuActive
        ? classes.horizontalMenuItem_active
        : classes.horizontalMenuItem;

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

    const maybeDownArrowIcon = category.children.length ? (
        <Icon className={classes.arrowDown} src={ArrowDown} size={16} />
    ) : null;

    const linkAttributes = category.children.length
        ? {
              'aria-label': `Category: ${category.name}. ${category.children.length} sub-categories`
          }
        : {};

    return (
        <div
            className={horizontalMenuItemClassname}
            data-cy="MegaMenu-HorizontalMenuItem"
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
                className={
                    isActive ? classes.horizontalMenuItemLinkActive : classes.horizontalMenuLink
                }
                data-cy="MegaMenu-HorizontalMenuItem-link"
                to={categoryUrl}
                onClick={onNavigate}
            >
                {category.name}
                {maybeDownArrowIcon}
            </Link>
            {children}
        </div>
    );
};

export default HorizontalMenuItem;

HorizontalMenuItem.propTypes = {
    category: PropTypes.shape({
        children: PropTypes.array,
        uid: PropTypes.string.isRequired,
        include_in_menu: PropTypes.number,
        isActive: PropTypes.bool,
        name: PropTypes.string.isRequired,
        path: PropTypes.array,
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
