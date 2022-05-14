import React, { useEffect, useRef, useState } from 'react';
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
 */
const SubcategoryItem = props => {
    const { category, onNavigate, activeCategoryId } = props;
    const classes = useStyle(defaultClasses, props.classes);
    const [open, setOpen] = useState(activeCategoryId === category.id);
    const isChildActive = useRef();

    // close or open category if the current or child category is selected / or not
    useEffect(() => {
        if (activeCategoryId !== category.id && !isChildActive.current) {
            setOpen(false);
        }
        if (activeCategoryId === category.id || isChildActive.current) {
            setOpen(true);
        }
    }, [isChildActive, activeCategoryId, category.id]);

    const subcategoryItemClasses =
        category.id === activeCategoryId ? classes.subcategoryItem_active : classes.subcategoryItem;

    let children = null;

    if (category.children.length) {
        let isChildrenDisplayed = activeCategoryId === category.id;
        const childrenItems = category.children.map((subCategory, index) => {
            if (subCategory.id === activeCategoryId) {
                isChildrenDisplayed = true;
                isChildActive.current = true;
            }

            const { id, name } = subCategory;
            const isSubCategoryActive = id === activeCategoryId;

            return (
                <li key={index} className={classes.subcategoryItemChild}>
                    <Button
                        variant="text"
                        className={isSubCategoryActive ? classes.button_active : classes.button}
                        data-cy="FilterSidebar-SubcategoryItem-button"
                        onClick={() => onNavigate(id)}
                    >
                        {name}
                    </Button>
                </li>
            );
        });

        if (!isChildrenDisplayed) {
            isChildActive.current = false;
        }

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
                    data-cy="FilterSidebar-SubcategoryItem-button"
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
    activeCategoryId: PropTypes.number
};
