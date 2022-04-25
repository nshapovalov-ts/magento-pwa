import React, { Fragment, useMemo } from 'react';
import { array, func, shape, string } from 'prop-types';

import FilterItem from './filterItem';

import { useStyle } from '@magento/venia-ui/lib/classify';
import setValidator from '@magento/peregrine/lib/validators/set';

import defaultClasses from './filterList.module.css';

const labels = new WeakMap();

const FilterList = props => {
    const { toggleItem, filterState, group, items, onApply } = props;
    const classes = useStyle(defaultClasses, props.classes);

    // memoize item creation
    // search value is not referenced, so this array is stable
    const itemElements = useMemo(
        () =>
            items.map(item => {
                const { title, value } = item;
                const key = `item-${group}-${value}`;

                const isSelected = filterState && filterState.has(item);

                // create an element for each item
                const element = (
                    <li key={key} className={classes.item} data-cy="FilterList-item">
                        <FilterItem
                            toggleItem={toggleItem}
                            group={group}
                            item={item}
                            onApply={onApply}
                            isSelected={isSelected}
                        />
                    </li>
                );

                // associate each element with its normalized title
                // titles are not unique, so use the element as the key
                labels.set(element, title.toUpperCase());

                return element;
            }),
        [classes, toggleItem, filterState, group, items, onApply]
    );

    return (
        <Fragment>
            <ul className={classes.items}>{itemElements}</ul>
        </Fragment>
    );
};

FilterList.propTypes = {
    classes: shape({
        item: string,
        items: string
    }),
    filterState: setValidator,
    group: string,
    items: array,
    onApply: func
};

export default FilterList;
