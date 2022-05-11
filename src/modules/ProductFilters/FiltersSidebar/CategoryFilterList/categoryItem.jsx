import React, { useEffect, useMemo, useState } from 'react';
import { ChevronDown, ChevronRight } from 'react-feather';
import PropTypes from 'prop-types';

import Icon from '@magento/venia-ui/lib/components/Icon';
import Button from 'components/Button';
import Subcategory from './subcategory';

import { useStyle } from '@magento/venia-ui/lib/classify';
import { usePrevious } from 'common/hooks/usePrevious';

import defaultClasses from './categoryItem.module.css';

/**
 * The CategoryItem component displays category item
 *
 * @param {Category} props.category
 * @param {Number} props.activeCategoryId - id of active category
 * @param {Number} props.activeParentId - active parent category id
 * @param {function} props.onNavigate - function called when clicking on button
 */
const CategoryItem = props => {
    const { category, onNavigate, activeCategoryId, activeParentId } = props;
    const classes = useStyle(defaultClasses, props.classes);

    const categoryItemClasses =
        category.id === activeCategoryId ? classes.categoryItem_active : classes.categoryItem;

    const [open, setOpen] = useState(activeParentId === category.id);

    const prevActiveCategoryId = usePrevious(activeCategoryId);
    const prevActiveParentId = usePrevious(activeParentId);

    // close current category on parent category change or filters clear
    useEffect(() => {
        if (prevActiveParentId && !activeParentId) {
            setOpen(false);
        }
    }, [prevActiveParentId, activeParentId]);

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
                activeParentId={activeParentId}
            />
        ) : null;
    }, [category, onNavigate, activeCategoryId, activeParentId]);

    return (
        <li className={categoryItemClasses} data-cy="categorySearch-categoryItem">
            <div className={classes.categoryName}>
                <Icon
                    src={open ? ChevronDown : ChevronRight}
                    size={18}
                    onClick={() => setOpen(!open)}
                />
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
    activeParentId: PropTypes.number
};
