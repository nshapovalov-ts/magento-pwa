import React from 'react';
import PropTypes from 'prop-types';

import SubmenuColumn from './submenuColumn';

import { useStyle } from '@magento/venia-ui/lib/classify';

import defaultClasses from './submenu.module.css';

/**
 * The Submenu component displays submenu in menu category
 *
 * @param {array} props.items - categories to display
 * @param {function} props.onNavigate - function called when clicking on Link
 * @param {Number} props.activeCategoryId - id of active category
 */
const Submenu = props => {
    const { items, onNavigate, activeCategoryId } = props;
    const classes = useStyle(defaultClasses, props.classes);

    const subMenus = items.map((category, index) => {
        return (
            <SubmenuColumn
                index={index}
                key={category.id}
                category={category}
                activeCategoryId={activeCategoryId}
                onNavigate={onNavigate}
            />
        );
    });

    return <ul className={classes.submenuItems}>{subMenus}</ul>;
};

export default Submenu;

Submenu.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            children: PropTypes.array.isRequired,
            uid: PropTypes.string.isRequired,
            include_in_menu: PropTypes.number.isRequired,
            isActive: PropTypes.bool.isRequired,
            name: PropTypes.string.isRequired,
            path: PropTypes.array.isRequired,
            position: PropTypes.number.isRequired,
            url_path: PropTypes.string.isRequired
        })
    ).isRequired,
    onNavigate: PropTypes.func.isRequired
};
