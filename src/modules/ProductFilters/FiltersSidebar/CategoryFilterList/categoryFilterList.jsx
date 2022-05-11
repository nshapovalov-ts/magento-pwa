import React, { useCallback, useMemo, useRef } from 'react';
import { useLocation } from 'react-router-dom';

import { CATEGORY_FILTER_GROUP } from '../../constants.js';
import {
    findActiveParent,
    getCategoryFilters,
    getFilterFromSearch,
    getVisibleCategories
} from '../../helpers';
import CategoryItem from './categoryItem';

import { useFilterSidebar } from '@magento/peregrine/lib/talons/FilterSidebar';
import { useMegaMenu } from '@magento/peregrine/lib/talons/MegaMenu/useMegaMenu';
import { GET_CATEGORIES } from 'modules/Header/categoryList.gql.js';

import classes from './categoryFilterList.module.css';

const CategoryFilterList = props => {
    const { filters } = props;
    const talonProps = useFilterSidebar({ filters });
    const { filterApi, filterItems, filterState, handleApply } = talonProps;
    const { search } = useLocation();
    const mainNavRef = useRef(null);
    const { megaMenuData: categories } = useMegaMenu({
        mainNavRef,
        operations: { getMegaMenuQuery: GET_CATEGORIES }
    });

    const categoryFilters = useMemo(() => getCategoryFilters(filterItems), [filterItems]);
    const [selectedCategory] = useMemo(() => getFilterFromSearch(search, CATEGORY_FILTER_GROUP), [
        search
    ]);

    const handleNavigate = useCallback(
        id => {
            const item = { title: categoryFilters[id], value: id };
            if (filterState) {
                filterState.delete(CATEGORY_FILTER_GROUP);
            }
            filterApi.toggleItem({
                group: CATEGORY_FILTER_GROUP,
                item
            });
            handleApply();
        },
        [categoryFilters, filterApi, filterState, handleApply]
    );

    const visibleCategories =
        categories && getVisibleCategories(categories?.children, categoryFilters);

    const activeParent = useMemo(
        () =>
            findActiveParent(visibleCategories, selectedCategory && Number(selectedCategory.value)),
        [visibleCategories, selectedCategory]
    );

    const items = visibleCategories
        ? visibleCategories.map(category => {
              return (
                  <CategoryItem
                      category={category}
                      onNavigate={handleNavigate}
                      key={category.uid}
                      activeCategoryId={selectedCategory && Number(selectedCategory.value)}
                      activeParentId={activeParent?.id === category.id ? category.id : undefined}
                  />
              );
          })
        : null;

    return (
        <div ref={mainNavRef}>
            <div className={classes.header}>
                <h2 data-cy="FilterSidebar-headerTitle" className={classes.headerTitle}>
                    Category
                </h2>
            </div>
            <ul className={classes.categories}>{items}</ul>
        </div>
    );
};

export default CategoryFilterList;
