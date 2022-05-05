import React, { Suspense, useRef } from 'react';
import { array, arrayOf, bool, shape, string } from 'prop-types';

import Filters from './Filters';
import SidebarShimmer from './filtersSidebar.shimmer';

import { useStyle } from '@magento/venia-ui/lib/classify';
import { useIsInViewport } from '@magento/peregrine/lib/hooks/useIsInViewport';

import defaultClasses from './filtersSidebar.module.css';

const CategoryList = React.lazy(() => import('./CategoryList'));
const CategoryFilterList = React.lazy(() => import('./CategoryFilterList'));

const FiltersSidebar = props => {
    const { filters, isCategoryFilter } = props;
    const classes = useStyle(defaultClasses, props.classes);
    const sidebarRef = useRef();

    const shouldRenderSidebarContent = useIsInViewport({
        elementRef: sidebarRef
    });

    if (!shouldRenderSidebarContent) {
        return null;
    }

    if (filters === null) {
        return <SidebarShimmer />;
    }

    return (
        <aside
            className={classes.root}
            ref={sidebarRef}
            data-cy="FilterSidebar-root"
            aria-live="polite"
            aria-busy="false"
        >
            <div className={classes.body}>
                {filters && filters.length > 0 && <Filters filters={filters} />}
                <Suspense fallback={null}>
                    {isCategoryFilter ? <CategoryFilterList filters={filters} /> : <CategoryList />}
                </Suspense>
            </div>
        </aside>
    );
};

FiltersSidebar.defaultProps = {
    filterCountToOpen: 3
};

FiltersSidebar.propTypes = {
    classes: shape({
        body: string,
        root: string
    }),
    filters: arrayOf(
        shape({
            attribute_code: string,
            items: array
        })
    ),
    isCategoryFilter: bool
};

export default FiltersSidebar;
