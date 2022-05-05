import React, { useCallback, useRef } from 'react';

import { getCategoryFilters } from '../../helpers';
import MenuItem from './menuItem';

import { useFilterSidebar } from '@magento/peregrine/lib/talons/FilterSidebar';
import { useMegaMenu } from '@magento/peregrine/lib/talons/MegaMenu/useMegaMenu';

import classes from './categoryFilterList.module.css';

const CategoryFilterList = props => {
    const { filters } = props;
    const talonProps = useFilterSidebar({ filters });
    const { filterApi, filterItems, filterNames, filterState, handleApply } = talonProps;

    const mainNavRef = useRef(null);
    const { megaMenuData: categories, subMenuState, handleNavigate } = useMegaMenu({ mainNavRef });

    const categoryFilters = getCategoryFilters(filterItems);

    const items = categories.children
        ? categories.children.map(category => {
              return (
                  <MenuItem
                      category={category}
                      onNavigate={handleNavigate}
                      key={category.uid}
                      subMenuState={subMenuState}
                  />
              );
          })
        : null;

    const handleApplyCategoryFilter = useCallback(
        (...args) => {
            handleApply(...args);
        },
        [handleApply]
    );

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
