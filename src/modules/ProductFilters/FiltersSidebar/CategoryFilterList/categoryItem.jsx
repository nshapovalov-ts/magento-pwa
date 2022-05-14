import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import Button from 'components/Button';
import DropdownIcon from './dropdownIcon';
import Subcategory from './subcategory';

import { useStyle } from '@magento/venia-ui/lib/classify';
import { usePrevious } from 'common/hooks/usePrevious';

import defaultClasses from './categoryItem.module.css';

/**
 * The CategoryItem component displays category item
 *
 * @param {Category} props.category
 * @param {Number} props.activeCategoryId - id of active category
 * @param {Bool} props.isParentActive - is parent category active
 * @param {function} props.onNavigate - function called when clicking on button
 */
const CategoryItem = props => {
    const { category, onNavigate, activeCategoryId, isParentActive } = props;
    const classes = useStyle(defaultClasses, props.classes);

    const categoryItemClasses =
        category.id === activeCategoryId ? classes.categoryItem_active : classes.categoryItem;

    const [open, setOpen] = useState(activeCategoryId === category.id);

    const prevActiveCategoryId = usePrevious(activeCategoryId);
    const prevParentActive = usePrevious(isParentActive);

    // close current category on parent category change or filters clear
    useEffect(() => {
        if (prevParentActive && !isParentActive) {
            setOpen(false);
        }
    }, [prevParentActive, isParentActive]);

    // show subcategory after parent category select
    useEffect(() => {
        if (prevActiveCategoryId !== activeCategoryId && activeCategoryId === category.id) {
            setOpen(true);
        }
    }, [prevActiveCategoryId, activeCategoryId, category.id]);

    const children = useMemo(() => {
        return category.children.length ? (
            <Subcategory
                items={category.children}
                onNavigate={onNavigate}
                activeCategoryId={activeCategoryId}
            />
        ) : null;
    }, [category, onNavigate, activeCategoryId]);

    const dropdownToggle = () => {
        setOpen(!open);
    };

    return (
        <li className={categoryItemClasses} data-cy="categorySearch-categoryItem">
            <div className={classes.categoryName}>
                <span className={classes.dropdownIcon}>
                    {category.children.length > 0 && (
                        <DropdownIcon isOpen={open} onClick={dropdownToggle} />
                    )}
                </span>
                <Button
                    className={classes.button}
                    variant="text"
                    data-cy="categorySearch-categoryItem-button"
                    onClick={() => onNavigate(category.id)}
                >
                    {category.name}
                </Button>
            </div>
            {open && children}
        </li>
    );
};

export default CategoryItem;

CategoryItem.propTypes = {
    category: PropTypes.shape({
        id: PropTypes.number.isRequired,
        children: PropTypes.array,
        name: PropTypes.string.isRequired
    }).isRequired,
    onNavigate: PropTypes.func.isRequired,
    activeCategoryId: PropTypes.number,
    isParentActive: PropTypes.bool.isRequired
};
