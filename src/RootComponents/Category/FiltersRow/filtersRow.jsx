import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { X as Remove } from 'react-feather';
import { FormattedMessage } from 'react-intl';
import { useLocation } from 'react-router-dom';
import { array, arrayOf, shape, string } from 'prop-types';

import Icon from '@magento/venia-ui/lib/components/Icon';
import Button from 'components/Button';
import CurrentFilters from '../FilterModal/CurrentFilters';
import FilterBlock from './filterBlock';

import { useStyle } from '@magento/venia-ui/lib/classify';
import { useFilterModal } from '@magento/peregrine/lib/talons/FilterModal';
import { getStateFromSearch } from '@magento/peregrine/lib/talons/FilterModal/helpers';

// import { useFilterModal } from '@magento/peregrine/lib/talons/FilterSidebar';
import defaultClasses from './filtersRow.module.css';

const FiltersRow = props => {
    const { filters } = props;
    const { pathname, search } = useLocation();
    const talonProps = useFilterModal({ filters });
    const {
        filterApi,
        filterItems,
        filterNames,
        filterState,
        handleApply,
        handleClose,
        filterKeys,
        handleReset,
        handleKeyDownActions
    } = talonProps;

    useEffect(() => {
        const nextState = getStateFromSearch(search, filterKeys, filterItems);

        filterApi.setItems(nextState);
    }, [filterApi, filterItems, filterKeys, search]);

    const resetFilters = useCallback(() => {
        const nextState = getStateFromSearch(search, filterKeys, filterItems);
        filterApi.setItems(nextState);
    }, [filterApi, search, filterKeys, filterItems]);

    const filterRef = useRef();
    const classes = useStyle(defaultClasses, props.classes);

    const handleApplyFilter = useCallback(
        (...args) => {
            handleApply(...args);
        },
        [handleApply]
    );

    // console.log('filterItems', filterItems);

    const clearAll = filterState.size ? (
        <Button
            className={classes.action}
            variant="text"
            onClick={handleReset}
            data-cy="FilterSidebar-clearButton"
        >
            <FormattedMessage id={'filterModal.action'} defaultMessage={'Clear all'} />
            <Icon size={20} src={Remove} />
        </Button>
    ) : null;

    const filtersList = useMemo(
        () =>
            // TODO: check which filters should be displayed on top, as example show only first 5
            [...filterItems].slice(0, 5).map(([group, items], iteration) => {
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
                        resetFilters={resetFilters}
                        onApply={handleApply}
                    />
                );
            }),
        [filterApi, filterItems, filterNames, filterState, resetFilters, handleApply]
    );

    return (
        <div className={classes.root} ref={filterRef}>
            <div className={classes.filterBlocks}>{filtersList}</div>
            <div className={classes.selectedFilters}>
                <CurrentFilters
                    filterApi={filterApi}
                    filterNames={filterNames}
                    filterState={filterState}
                    onRemove={handleApplyFilter}
                />
                {clearAll}
            </div>
        </div>
    );
};

FiltersRow.propTypes = {
    filters: arrayOf(
        shape({
            attribute_code: string,
            items: array
        })
    )
};

export default FiltersRow;
