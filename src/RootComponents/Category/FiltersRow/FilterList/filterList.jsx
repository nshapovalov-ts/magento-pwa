import React, { Fragment, useMemo } from 'react';
import { useFieldState } from 'informed';
import { array, bool, func, shape, string } from 'prop-types';

import FilterItem from './filterItem';

import { useStyle } from '@magento/venia-ui/lib/classify';
import setValidator from '@magento/peregrine/lib/validators/set';

import defaultClasses from './filterList.module.css';

const FilterList = props => {
    const { toggleItem, filterState, group, items, onApply, isRadio } = props;
    const classes = useStyle(defaultClasses, props.classes);

    const { value: searchFieldValue = '' } = useFieldState('search');

    const filtersBySearch = useMemo(() => {
        if (searchFieldValue) {
            return items.filter(item => {
                const title = item.title.toLowerCase();

                return title.includes(searchFieldValue.toLowerCase());
            });
        }

        return items;
    }, [items, searchFieldValue]);

    // memoize item creation
    // search value is not referenced, so this array is stable
    const itemElements = useMemo(
        () =>
            filtersBySearch.map(item => {
                const key = `item-${group}-${item.value}`;

                const isSelected = !!(filterState && filterState.has(item));

                // create an element for each item
                const element = (
                    <li key={key} className={classes.item} data-cy="FilterList-item">
                        <FilterItem
                            toggleItem={toggleItem}
                            group={group}
                            item={item}
                            onApply={onApply}
                            isSelected={isSelected}
                            isRadio={isRadio}
                        />
                    </li>
                );

                return element;
            }),
        [classes, toggleItem, filterState, group, filtersBySearch, onApply, isRadio]
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
    onApply: func,
    isRadio: bool
};

export default FilterList;
