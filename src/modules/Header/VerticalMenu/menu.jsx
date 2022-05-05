import React, { useRef } from 'react';

import MenuItem from './menuItem';

import { useStyle } from '@magento/venia-ui/lib/classify';
import { useIsInViewport } from '@magento/peregrine/lib/hooks/useIsInViewport';
import { useMegaMenu } from '@magento/peregrine/lib/talons/MegaMenu/useMegaMenu';
import { GET_CATEGORIES } from '../categoryList.gql.js';

import defaultClasses from './menu.module.css';

/**
 * The VerticalMenu component displays menu with categories on desktop devices
 */
const VerticalMenu = props => {
    const mainNavRef = useRef(null);

    const {
        megaMenuData,
        activeCategoryId,
        subMenuState,
        disableFocus,
        handleSubMenuFocus,
        categoryUrlSuffix,
        handleNavigate,
        handleClickOutside
    } = useMegaMenu({ mainNavRef, operations: { getMegaMenuQuery: GET_CATEGORIES } });

    const classes = useStyle(defaultClasses, props.classes);

    const shouldRenderItems = useIsInViewport({
        elementRef: mainNavRef
    });

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
                      disableFocus={disableFocus}
                      handleSubMenuFocus={handleSubMenuFocus}
                      handleClickOutside={handleClickOutside}
                  />
              );
          })
        : null;

    return (
        <nav
            ref={mainNavRef}
            className={classes.menu}
            data-cy="VerticalMenu"
            role="navigation"
            onFocus={handleSubMenuFocus}
        >
            {shouldRenderItems ? items : null}
        </nav>
    );
};

export default VerticalMenu;
