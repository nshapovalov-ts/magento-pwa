import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { useStyle } from '@magento/venia-ui/lib/classify';
import resourceUrl from '@magento/peregrine/lib/util/makeUrl';

import defaultClasses from './submenuColumn.module.css';

/**
 * The SubmenuColumn component displays columns with categories in submenu
 *
 * @param {MegaMenuCategory} props.category
 * @param {function} props.onNavigate - function called when clicking on Link
 */
const SubmenuColumn = props => {
    const { category, categoryUrlSuffix, onNavigate, handleCloseSubMenu } = props;
    const classes = useStyle(defaultClasses, props.classes);

    const categoryUrl = resourceUrl(`/${category.url_path}${categoryUrlSuffix || ''}`);
    let children = null;

    if (category.children.length) {
        const childrenItems = category.children.map((subCategory, index) => {
            const { url_path, isActive, name } = subCategory;
            const categoryUrl = resourceUrl(`/${url_path}${categoryUrlSuffix || ''}`);

            // setting keyboardProps if it is last child of that category
            const keyboardProps = index === category.children.length - 1 ? props.keyboardProps : {};

            return (
                <li key={index} className={classes.submenuChildItem}>
                    <Link
                        {...keyboardProps}
                        className={isActive ? classes.linkActive : classes.link}
                        data-cy="MegaMenu-SubmenuColumn-link"
                        to={categoryUrl}
                        onClick={onNavigate}
                    >
                        {name}
                    </Link>
                </li>
            );
        });

        children = <ul className={classes.submenuChild}>{childrenItems}</ul>;
    }

    // setting keyboardProps if category does not have any sub-category
    const keyboardProps = category.children.length ? {} : props.keyboardProps;

    return (
        <div className={classes.submenuColumn}>
            <Link
                {...keyboardProps}
                className={classes.link}
                data-cy="MegaMenu-SubmenuColumn-link"
                to={categoryUrl}
                onClick={() => {
                    handleCloseSubMenu();
                    onNavigate();
                }}
            >
                <span className={classes.heading}>{category.name}</span>
            </Link>
            {children}
        </div>
    );
};

export default SubmenuColumn;

SubmenuColumn.propTypes = {
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
    categoryUrlSuffix: PropTypes.string,
    onNavigate: PropTypes.func.isRequired,
    handleCloseSubMenu: PropTypes.func.isRequired
};
