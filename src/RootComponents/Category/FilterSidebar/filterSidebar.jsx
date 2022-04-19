import React, { useCallback, useMemo, useRef } from 'react';
import { array, arrayOf, number, shape, string } from 'prop-types';

import CategoryList from '../CategoryList';
import FilterBlock from '../FilterModal/filterBlock';

import { useStyle } from '@magento/venia-ui/lib/classify';
import { useFilterSidebar } from '@magento/peregrine/lib/talons/FilterSidebar';

import defaultClasses from './filterSidebar.module.css';

const SCROLL_OFFSET = 150;

/**
 * A view that displays applicable and applied filters.
 *
 * @param {Object} props.filters - filters to display
 */
const FilterSidebar = props => {
    const { filters, filterCountToOpen } = props;
    const talonProps = useFilterSidebar({ filters });
    const { filterApi, filterItems, filterNames, filterState, handleApply } = talonProps;

    const filterRef = useRef();
    const classes = useStyle(defaultClasses, props.classes);

    const handleApplyFilter = useCallback(
        (...args) => {
            const filterElement = filterRef.current;
            if (filterElement && typeof filterElement.getBoundingClientRect === 'function') {
                const filterTop = filterElement.getBoundingClientRect().top;
                const windowScrollY = window.scrollY + filterTop - SCROLL_OFFSET;
                window.scrollTo(0, windowScrollY);
            }

            handleApply(...args);
        },
        [handleApply, filterRef]
    );

    const filtersList = useMemo(
        () =>
            Array.from(filterItems, ([group, items], iteration) => {
                const blockState = filterState.get(group);
                const groupName = filterNames.get(group);

                return (
                    <FilterBlock
                        key={group}
                        filterApi={filterApi}
                        filterState={blockState}
                        group={group}
                        items={items}
                        name={groupName}
                        onApply={handleApplyFilter}
                        initialOpen={iteration < filterCountToOpen}
                    />
                );
            }),
        [filterApi, filterItems, filterNames, filterState, filterCountToOpen, handleApplyFilter]
    );

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
                <ul className={classes.blocks}>
                    <div>{filtersList}</div>
                </ul>
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
