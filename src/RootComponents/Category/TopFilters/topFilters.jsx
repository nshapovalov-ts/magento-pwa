import React from 'react';
import { Form } from 'informed';

import FilterList from '@magento/venia-ui/lib/components/FilterModal/FilterList';

import classes from './topFilters.module.css';

const TopFilters = () => {
    return (
        <div>
            Top filters
            <Form className={classes.list}>
                {/* <FilterList
                    filterApi={filterApi}
                    filterState={filterState}
                    group={group}
                    items={items}
                    onApply={onApply}
                /> */}
            </Form>
        </div>
    );
};

export default TopFilters;
