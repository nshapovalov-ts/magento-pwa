import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Submenu from './submenu';

import { useStyle } from '@magento/venia-ui/lib/classify';

import defaultClasses from './menuItem.module.css';

/**
 * The MenuItem component displays category menu item
 *
 * @param {MenuCategory} props.category
 * @param {String} props.activeCategoryId - uid of active category
 * @param {function} props.onNavigate - function called when clicking on Link
 */
const MenuItem = props => {
    const { activeCategoryId, category, subMenuState, onNavigate } = props;

    const classes = useStyle(defaultClasses, props.classes);

    const children = useMemo(() => {
        return category.children.length && activeCategoryId === category.uid ? (
            <Submenu
                subMenuState={subMenuState}
                items={category.children}
                categoryUrlSuffix={categoryUrlSuffix}
                onNavigate={onNavigate}
            />
        ) : null;
    }, [category, subMenuState, onNavigate, activeCategoryId]);

    const linkAttributes = category.children.length
        ? {
              'aria-label': `Category: ${category.name}. ${category.children.length} sub-categories`
          }
        : {};

    return (
        <li className={classes.menuItem} data-cy="productsCategory-menuItem">
            <Link
                {...linkAttributes}
                className={classes.menuLink}
                data-cy="productsCategory-menuItem-link"
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
