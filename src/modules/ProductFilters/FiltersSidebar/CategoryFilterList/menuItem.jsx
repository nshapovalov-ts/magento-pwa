import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import Button from 'components/Button';
import Submenu from './submenu';

import { useStyle } from '@magento/venia-ui/lib/classify';

import defaultClasses from './menuItem.module.css';

/**
 * The MenuItem component displays category menu item
 *
 * @param {MenuCategory} props.category
 * @param {Number} props.activeCategoryId - id of active category
 * @param {function} props.onNavigate - function called when clicking on Link
 */
const MenuItem = props => {
    const { category, onNavigate, activeCategoryId } = props;

    const classes = useStyle(defaultClasses, props.classes);

    const children = useMemo(() => {
        return category.children.length ? (
            <Submenu
                items={category.children}
                onNavigate={onNavigate}
                activeCategoryId={activeCategoryId}
            />
        ) : null;
    }, [category, onNavigate, activeCategoryId]);

    return (
        <li className={classes.menuItem} data-cy="productsCategory-menuItem">
            <Button
                variant="text"
                className={classes.menuLink}
                data-cy="productsCategory-menuItem-link"
                onClick={() => onNavigate(category.id)}
            >
                {category.name}
            </Button>
            {children}
        </li>
    );
};

export default MenuItem;

MenuItem.propTypes = {
    category: PropTypes.shape({
        include_in_menu: PropTypes.number,
        isActive: PropTypes.bool,
        name: PropTypes.string.isRequired
    }).isRequired,
    onNavigate: PropTypes.func.isRequired,
    activeCategoryId: PropTypes.number
};
