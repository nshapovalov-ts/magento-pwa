import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Button from 'components/Button';
import DropdownIcon from './dropdownIcon';

import { useStyle } from '@magento/venia-ui/lib/classify';

import defaultClasses from './subcategoryItem.module.css';

/**
 * The SubcategoryItem component displays items with categories in subcategory
 *
 * @param {MenuCategory} props.category
 * @param {function} props.onNavigate - function called when clicking on Link
 * @param {Number} props.activeCategoryId - id of active category
 * @param {Number} props.activeParentId - parent active category id
 */
const SubcategoryItem = props => {
    const { category, onNavigate, activeCategoryId, activeParentId } = props;
    const classes = useStyle(defaultClasses, props.classes);
    const [open, setOpen] = useState(activeCategoryId === category.id);

    useEffect(() => {
        if (
            activeCategoryId === category.id ||
            (activeParentId && activeParentId !== activeCategoryId)
        ) {
            setOpen(true);
        }
    }, [activeCategoryId, category.id, activeParentId]);

    // close submenu on parent category select
    useEffect(() => {
        if (activeCategoryId === activeParentId) {
            setOpen(false);
        }
    }, [activeCategoryId, activeParentId]);

    const subcategoryItemClasses =
        category.id === activeCategoryId ? classes.subcategoryItem_active : classes.subcategoryItem;

    let children = null;

    if (category.children.length) {
        let isChildrenDisplayed = activeCategoryId === category.id;
        const childrenItems = category.children.map((subCategory, index) => {
            if (subCategory.id === activeCategoryId) {
                isChildrenDisplayed = true;
            }

            const { id, name } = subCategory;
            const isSubCategoryActive = id === activeCategoryId;

            return (
                <li key={index} className={classes.subcategoryItemChild}>
                    <Button
                        variant="text"
                        className={isSubCategoryActive ? classes.button_active : classes.button}
                        data-cy="VerticalMenu-SubcategoryItem-button"
                        onClick={() => onNavigate(id)}
                    >
                        {name}
                    </Button>
                </li>
            );
        });

        children =
            isChildrenDisplayed || open ? (
                <ul className={classes.submenuChild}>{childrenItems}</ul>
            ) : null;
    }

    const dropdownToggle = () => {
        setOpen(!open);
    };

    return (
        <li className={subcategoryItemClasses}>
            <div className={classes.subcategoryName}>
                <span className={classes.dropdownIcon}>
                    {category.children.length > 0 && (
                        <DropdownIcon isOpen={open} onClick={dropdownToggle} />
                    )}
                </span>

                <Button
                    variant="text"
                    className={
                        activeCategoryId === category.id ? classes.button_active : classes.button
                    }
                    data-cy="VerticalMenu-SubcategoryItem-button"
                    onClick={() => onNavigate(category.id)}
                >
                    {category.name}
                </Button>
            </div>
            {open && children}
        </li>
    );
};

export default SubcategoryItem;

SubcategoryItem.propTypes = {
    category: PropTypes.shape({
        id: PropTypes.number.isRequired,
        children: PropTypes.array,
        name: PropTypes.string.isRequired
    }).isRequired,
    onNavigate: PropTypes.func.isRequired,
    activeCategoryId: PropTypes.number,
    activeParentId: PropTypes.number
};
