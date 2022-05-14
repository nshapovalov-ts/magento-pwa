import React from 'react';
import PropTypes from 'prop-types';

import SubcategoryItem from './subcategoryItem';

import { useStyle } from '@magento/venia-ui/lib/classify';

import defaultClasses from './subcategory.module.css';

/**
 * The SubCategory component displays subcategory in category
 *
 * @param {array} props.items - categories to display
 * @param {function} props.onNavigate - function called when clicking on button
 * @param {Number} props.activeCategoryId - id of active category
 */
const Subcategory = props => {
    const { items, onNavigate, activeCategoryId } = props;
    const classes = useStyle(defaultClasses, props.classes);

    const subcategoryItems = items.map((category, index) => {
        return (
            <SubcategoryItem
                index={index}
                key={category.id}
                category={category}
                activeCategoryId={activeCategoryId}
                onNavigate={onNavigate}
            />
        );
    });

    return <ul className={classes.subcategory}>{subcategoryItems}</ul>;
};

export default Subcategory;

Subcategory.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            children: PropTypes.array.isRequired,
            name: PropTypes.string.isRequired
        })
    ).isRequired,
    onNavigate: PropTypes.func.isRequired,
    activeCategoryId: PropTypes.number
};
