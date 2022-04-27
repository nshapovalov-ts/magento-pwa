import React, { useRef } from 'react';
import { array, arrayOf, number, shape, string } from 'prop-types';

import CategoryList from '../CategoryList';

import { useStyle } from '@magento/venia-ui/lib/classify';

// import { useFilterSidebar } from '@magento/peregrine/lib/talons/FilterSidebar';
import defaultClasses from './filterSidebar.module.css';

/**
 * A view that displays applicable and applied filters.
 *
 * @param {Object} props.filters - filters to display
 */
const FilterSidebar = props => {
    // const { filters } = props;
    // const talonProps = useFilterSidebar({ filters });
    // const { filterApi, filterItems, filterNames, filterState, handleApply } = talonProps;

    const filterRef = useRef();
    const classes = useStyle(defaultClasses, props.classes);

    //TODO: need to create popular filters block
    return (
        <aside
            className={classes.root}
            ref={filterRef}
            data-cy="FilterSidebar-root"
            aria-live="polite"
            aria-busy="false"
        >
            <div className={classes.body}>
                <CategoryList />

                {/* <ul className={classes.blocks}></ul> */}
            </div>
        </aside>
    );
};

FilterSidebar.defaultProps = {
    filterCountToOpen: 3
};

FilterSidebar.propTypes = {
    classes: shape({
        action: string,
        blocks: string,
        body: string,
        header: string,
        headerTitle: string,
        root: string,
        root_open: string
    }),
    filters: arrayOf(
        shape({
            attribute_code: string,
            items: array
        })
    ),
    filterCountToOpen: number
};

export default FilterSidebar;
