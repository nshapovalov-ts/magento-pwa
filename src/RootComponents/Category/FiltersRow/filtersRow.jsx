import React, { useCallback, useMemo, useRef } from 'react';
import { X as Remove } from 'react-feather';
import { FormattedMessage } from 'react-intl';
import { array, arrayOf, shape, string } from 'prop-types';

import Icon from '@magento/venia-ui/lib/components/Icon';
import Button from 'components/Button';
import CurrentFilters from '../FilterModal/CurrentFilters';

import { useStyle } from '@magento/venia-ui/lib/classify';
import { useFilterSidebar } from '@magento/peregrine/lib/talons/FilterSidebar';

import defaultClasses from './filtersRow.module.css';

const FiltersRow = props => {
    const { filters } = props;
    const talonProps = useFilterSidebar({ filters });
    const {
        filterApi,
        // filterItems,
        filterNames,
        filterState,
        handleApply,
        handleReset
    } = talonProps;

    const filterRef = useRef();
    const classes = useStyle(defaultClasses, props.classes);

    const handleApplyFilter = useCallback(
        (...args) => {
            handleApply(...args);
        },
        [handleApply]
    );

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

    return (
        <div className={classes.root} ref={filterRef}>
            <CurrentFilters
                filterApi={filterApi}
                filterNames={filterNames}
                filterState={filterState}
                onRemove={handleApplyFilter}
            />
            {clearAll}
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
