import React, { useMemo } from 'react';
import { Form } from 'informed';
import { array, arrayOf, shape, string } from 'prop-types';

import FilterList from '../../FilterList';
import { getSidebarFilters } from '../../helpers';

import { useFilterSidebar } from '@magento/peregrine/lib/talons/FilterSidebar';

import classes from './filters.module.css';

const Filters = props => {
    const { filters } = props;
    const talonProps = useFilterSidebar({ filters });
    const { filterApi, filterItems, filterNames, filterState, handleApply } = talonProps;

    const sidebarFilters = getSidebarFilters(filterItems);

    const filtersList = useMemo(
        () =>
            Array.from(sidebarFilters, ([group, items]) => {
                const item = items.find(data => data.value === '1');

                if (!item) {
                    return null;
                }

                const blockState = filterState.get(group);
                const groupName = filterNames.get(group);

                const handleToggle = () => {
                    filterApi.toggleItem({ group, item });
                    handleApply();
                };

                return (
                    <Form key={group}>
                        <FilterList
                            groupName={groupName}
                            toggleItem={handleToggle}
                            filterState={blockState}
                            group={group}
                            items={items}
                        />
                    </Form>
                );
            }),
        [filterNames, filterState, filterApi, sidebarFilters, handleApply]
    );

    if (filtersList.length == 0) {
        return null;
    }

    return <div className={classes.filters}>{filtersList}</div>;
};

Filters.propTypes = {
    filters: arrayOf(
        shape({
            attribute_code: string,
            items: array
        })
    )
};

export default Filters;
