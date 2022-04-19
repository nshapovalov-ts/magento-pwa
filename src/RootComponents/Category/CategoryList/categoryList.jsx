import React, { useRef } from 'react';

import MenuItem from './menuItem';

import { useMegaMenu } from '@magento/peregrine/lib/talons/MegaMenu/useMegaMenu';

import classes from './categoryList.module.css';

const CategoryList = () => {
    const mainNavRef = useRef(null);
    const {
        megaMenuData,
        activeCategoryId,
        subMenuState,
        categoryUrlSuffix,
        handleNavigate
    } = useMegaMenu({ mainNavRef });

    const items = megaMenuData.children
        ? megaMenuData.children.map(category => {
              return (
                  <MenuItem
                      category={category}
                      activeCategoryId={activeCategoryId}
                      categoryUrlSuffix={categoryUrlSuffix}
                      onNavigate={handleNavigate}
                      key={category.uid}
                      subMenuState={subMenuState}
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

export default CategoryList;
