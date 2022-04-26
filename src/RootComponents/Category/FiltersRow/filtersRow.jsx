import React, { useCallback, useEffect, useMemo } from 'react';
import { X as Remove } from 'react-feather';
import { FormattedMessage } from 'react-intl';
import { useLocation } from 'react-router-dom';
import { array, arrayOf, shape, string } from 'prop-types';

import Icon from '@magento/venia-ui/lib/components/Icon';
import ProductSort from '@magento/venia-ui/lib/components/ProductSort';
import Shimmer from '@magento/venia-ui/lib/components/Shimmer';
import Button from 'components/Button';
import CurrentFilters from '../CurrentFilters';
import { getPriceFromSearch } from '../helpers';
import FilterBlock from './filterBlock';

import { useStyle } from '@magento/venia-ui/lib/classify';
import { useFilterModal } from '@magento/peregrine/lib/talons/FilterModal';
import { getStateFromSearch } from '@magento/peregrine/lib/talons/FilterModal/helpers';

import defaultClasses from './filtersRow.module.css';

const FiltersRow = props => {
    const { filters, availableSortMethods, sortProps } = props;
    const { search } = useLocation();
    const talonProps = useFilterModal({ filters });
    const {
        filterApi,
        filterItems,
        filterNames,
        filterState,
        handleApply,
        filterKeys,
        handleReset
    } = talonProps;

    const shouldShowShimmer = !availableSortMethods?.length && !filters?.length;

    const queryState = useMemo(() => getStateFromSearch(search, filterKeys, filterItems), [
        search,
        filterKeys,
        filterItems
    ]);

    // replace price filter values with custom full range from min to max
    const priceState = useMemo(() => getPriceFromSearch(search), [search]);

    if (priceState.size) {
        queryState.set('price', priceState);
    }

    useEffect(() => {
        filterApi.setItems(queryState);
    }, [filterApi, filterItems, filterKeys, search, queryState, priceState]);

    const resetFilters = useCallback(() => {
        filterApi.setItems(queryState);
    }, [filterApi, queryState]);

    const classes = useStyle(defaultClasses, props.classes);

    const handleApplyFilter = useCallback(
        (...args) => {
            handleApply(...args);
        },
        [handleApply]
    );

    const maybeSortButton = availableSortMethods?.length && (
        <ProductSort sortProps={sortProps} availableSortMethods={availableSortMethods} />
    );

    const clearAll = queryState.size ? (
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
            // TODO: check which filters should be displayed on top, as example show only first of ..
            Array.from(filterItems, ([group, items], index) => {
                const blockState = filterState.get(group);
                const groupName = filterNames.get(group);

                const sampleTypes = () => {
                    if (index === 2) {
                        return 'radio';
                    }
                    if (group === 'price') {
                        return 'slider';
                    }

                    return 'checkbox';
                };

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
                        withSearch={group !== 'price'}
                        // need some kind of type in filters data and the presence of a search field
                        type={sampleTypes()} // as sample
                    />
                );
            }),
        [filterApi, filterItems, filterNames, filterState, resetFilters, handleApply]
    );

    return (
        <div className={classes.root}>
            {shouldShowShimmer ? (
                // TODO: add classes to shimmer
                <Shimmer height={'56px'} width={`100%`} style={{ marginBottom: 30 }} />
            ) : (
                <div className={classes.row}>
                    {maybeSortButton}
                    <ul className={classes.filterBlocks}>{filtersList}</ul>
                </div>
            )}
            <div className={classes.selectedFilters}>
                <CurrentFilters
                    filterApi={filterApi}
                    filterNames={filterNames}
                    filterState={queryState}
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
    ),
    availableSortMethods: arrayOf(
        shape({
            label: string,
            value: string
        })
    ),
    sortProps: array
};

export default FiltersRow;
