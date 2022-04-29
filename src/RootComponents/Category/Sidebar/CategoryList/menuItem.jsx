import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Submenu from './submenu';

import { useStyle } from '@magento/venia-ui/lib/classify';
import { useMegaMenuItem } from '@magento/peregrine/lib/talons/MegaMenu/useMegaMenuItem';
import resourceUrl from '@magento/peregrine/lib/util/makeUrl';

import defaultClasses from './menuItem.module.css';

/**
 * The MenuItem component displays category menu item
 *
 * @param {MenuCategory} props.category
 * @param {String} props.activeCategoryId - uid of active category
 * @param {function} props.onNavigate - function called when clicking on Link
 */
const MenuItem = props => {
    const { activeCategoryId, category, categoryUrlSuffix, subMenuState, onNavigate } = props;

    const classes = useStyle(defaultClasses, props.classes);
    const categoryUrl = resourceUrl(`/${category.url_path}${categoryUrlSuffix || ''}`);

    const talonProps = useMegaMenuItem({
        category,
        activeCategoryId,
        subMenuState
    });

    const { isActive, handleKeyDown } = talonProps;

    const menuItemClasses = category.isActive ? classes.menuItem_active : classes.menuItem;

    const children = useMemo(() => {
        return category.children.length && activeCategoryId === category.uid ? (
            <Submenu
                subMenuState={subMenuState}
                items={category.children}
                categoryUrlSuffix={categoryUrlSuffix}
                onNavigate={onNavigate}
            />
        ) : null;
    }, [category, subMenuState, categoryUrlSuffix, onNavigate, activeCategoryId]);

    const linkAttributes = category.children.length
        ? {
              'aria-label': `Category: ${category.name}. ${category.children.length} sub-categories`
          }
        : {};

    return (
        <li className={menuItemClasses} data-cy="productsCategory-menuItem">
            <Link
                {...linkAttributes}
                onKeyDown={handleKeyDown}
                className={isActive ? classes.menuItemLinkActive : classes.menuLink}
                data-cy="productsCategory-menuItem-link"
                to={categoryUrl}
                onClick={onNavigate}
            >
                {category.name}
            </Link>
            {children}
        </li>
    );
};

export default MenuItem;

MenuItem.propTypes = {
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
    categoryUrlSuffix: PropTypes.string,
    onNavigate: PropTypes.func.isRequired
};
