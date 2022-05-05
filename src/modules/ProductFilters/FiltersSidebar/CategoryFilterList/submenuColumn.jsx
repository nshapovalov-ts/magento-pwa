import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { useStyle } from '@magento/venia-ui/lib/classify';
import resourceUrl from '@magento/peregrine/lib/util/makeUrl';

import defaultClasses from './submenuColumn.module.css';

/**
 * The SubmenuColumn component displays columns with categories in submenu
 *
 * @param {MenuCategory} props.category
 * @param {function} props.onNavigate - function called when clicking on Link
 */
const SubmenuColumn = props => {
    const { category, onNavigate } = props;
    const classes = useStyle(defaultClasses, props.classes);

    const submenuClasses = category.isActive ? classes.submenuColumnActive : classes.submenuColumn;

    let children = null;

    if (category.children.length) {
        let isChildrenDisplayed = !!category.isActive;
        const childrenItems = category.children.map((subCategory, index) => {
            const { isActive, name } = subCategory;

            if (isActive || category.isActive) {
                isChildrenDisplayed = true;
            }

            return (
                <li key={index} className={classes.submenuChildItem}>
                    <Link
                        className={isActive ? classes.linkActive : classes.link}
                        data-cy="VerticalMenu-SubmenuColumn-link"
                        onClick={onNavigate}
                    >
                        {name}
                    </Link>
                </li>
            );
        });

        children = isChildrenDisplayed ? (
            <ul className={classes.submenuChild}>{childrenItems}</ul>
        ) : null;
    }

    return (
        <li className={submenuClasses}>
            <Link
                className={classes.link}
                data-cy="VerticalMenu-SubmenuColumn-link"
                onClick={onNavigate}
            >
                <span>{category.name}</span>
            </Link>
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
    onNavigate: PropTypes.func.isRequired
};
