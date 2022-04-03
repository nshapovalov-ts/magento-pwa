import React, { useEffect, useRef, useState } from 'react';

import HorizontalMenuItem from './horizontalMenuItem';
import { MENU_LINKS } from './sampleData';

import { useStyle } from '@magento/venia-ui/lib/classify';
import { useIsInViewport } from '@magento/peregrine/lib/hooks/useIsInViewport';
import { useMegaMenu } from '@magento/peregrine/lib/talons/MegaMenu/useMegaMenu';

import defaultClasses from './horizontalMenu.module.css';

/**
 * The HorizontalMenu component displays menu with categories on desktop devices
 */
const HorizontalMenu = props => {
    const mainNavRef = useRef(null);

    const {
        activeCategoryId,
        subMenuState,
        disableFocus,
        handleSubMenuFocus,
        categoryUrlSuffix,
        handleNavigate,
        handleClickOutside
    } = useMegaMenu({ mainNavRef });

    const classes = useStyle(defaultClasses, props.classes);

    const [mainNavWidth, setMainNavWidth] = useState(0);
    const shouldRenderItems = useIsInViewport({
        elementRef: mainNavRef
    });

    useEffect(() => {
        const handleResize = () => {
            const navWidth = mainNavRef.current ? mainNavRef.current.offsetWidth : null;

            setMainNavWidth(navWidth);
        };

        window.addEventListener('resize', handleResize);

        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    });

    const items = MENU_LINKS.children
        ? MENU_LINKS.children.map(category => {
              return (
                  <HorizontalMenuItem
                      category={category}
                      activeCategoryId={activeCategoryId}
                      categoryUrlSuffix={categoryUrlSuffix}
                      mainNavWidth={mainNavWidth}
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
            className={classes.horizontalMenu}
            data-cy="HorizontalMenu-megaMenu"
            role="navigation"
            onFocus={handleSubMenuFocus}
        >
            {shouldRenderItems ? items : null}
        </nav>
    );
};

export default HorizontalMenu;
