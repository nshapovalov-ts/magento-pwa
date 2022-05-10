import React from 'react';
import PropTypes from 'prop-types';

import Button from 'components/Button';

import { useStyle } from '@magento/venia-ui/lib/classify';

import defaultClasses from './submenuColumn.module.css';

/**
 * The SubmenuColumn component displays columns with categories in submenu
 *
 * @param {MenuCategory} props.category
 * @param {function} props.onNavigate - function called when clicking on Link
 * @param {Number} props.activeCategoryId - id of active category
 */
const SubmenuColumn = props => {
    const { category, onNavigate, activeCategoryId } = props;
    const classes = useStyle(defaultClasses, props.classes);

    const submenuClasses =
        category.id === activeCategoryId ? classes.submenuColumnActive : classes.submenuColumn;

    let children = null;

    if (category.children.length) {
        const childrenItems = category.children.map((subCategory, index) => {
            const { id, name } = subCategory;
            const isSubCategoryActive = id === activeCategoryId;

            return (
                <li key={index} className={classes.submenuChildItem}>
                    <Button
                        variant="text"
                        className={isSubCategoryActive ? classes.linkActive : classes.link}
                        data-cy="VerticalMenu-SubmenuColumn-link"
                        onClick={() => onNavigate(id)}
                    >
                        {name}
                    </Button>
                </li>
            );
        });

        children = <ul className={classes.submenuChild}>{childrenItems}</ul>;
    }

    return (
        <li className={submenuClasses}>
            <Button
                variant="text"
                className={classes.link}
                data-cy="VerticalMenu-SubmenuColumn-link"
                onClick={() => onNavigate(category.id)}
            >
                <span>{category.name}</span>
            </Button>
            {children}
        </li>
    );
};

export default SubmenuColumn;

SubmenuColumn.propTypes = {
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
    onNavigate: PropTypes.func.isRequired,
    activeCategoryId: PropTypes.number
};
