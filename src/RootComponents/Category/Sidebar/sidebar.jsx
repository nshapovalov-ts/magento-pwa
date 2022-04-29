import React, { useRef } from 'react';
import { array, arrayOf, shape, string } from 'prop-types';

import CategoryList from './CategoryList';
import Filters from './Filters';
import SidebarShimmer from './sidebar.shimmer';

import { useStyle } from '@magento/venia-ui/lib/classify';
import { useIsInViewport } from '@magento/peregrine/lib/hooks/useIsInViewport';

import defaultClasses from './sidebar.module.css';

const Sidebar = props => {
    const { filters } = props;
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
                <CategoryList />
            </div>
        </aside>
    );
};

Sidebar.defaultProps = {
    filterCountToOpen: 3
};

Sidebar.propTypes = {
    classes: shape({
        body: string,
        root: string
    }),
    filters: arrayOf(
        shape({
            attribute_code: string,
            items: array
        })
    )
};

export default Sidebar;
