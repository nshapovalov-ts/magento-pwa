import React, { Fragment, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { array, func, number, shape, string } from 'prop-types';

import FilterItem from './filterItem';

import { useStyle } from '@magento/venia-ui/lib/classify';
import { useFilterList } from '@magento/peregrine/lib/talons/FilterModal';
import setValidator from '@magento/peregrine/lib/validators/set';

import defaultClasses from './filterList.module.css';

const labels = new WeakMap();

const FilterList = props => {
    const { toggleItem, filterState, group, itemCountToShow, items, onApply } = props;
    const classes = useStyle(defaultClasses, props.classes);
    const talonProps = useFilterList({ filterState, items, itemCountToShow });
    const { isListExpanded, handleListToggle } = talonProps;
    const { formatMessage } = useIntl();

    // memoize item creation
    // search value is not referenced, so this array is stable
    const itemElements = useMemo(
        () =>
            items.map((item, index) => {
                const { title, value } = item;
                const key = `item-${group}-${value}`;

                if (!isListExpanded && index >= itemCountToShow) {
                    return null;
                }

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
        [classes, toggleItem, filterState, group, items, isListExpanded, itemCountToShow, onApply]
    );

    const showMoreLessItem = useMemo(() => {
        if (items.length <= itemCountToShow) {
            return null;
        }

        const label = isListExpanded
            ? formatMessage({
                  id: 'filterList.showLess',
                  defaultMessage: 'Show Less'
              })
            : formatMessage({
                  id: 'filterList.showMore',
                  defaultMessage: 'Show More'
              });

        return (
            <li className={classes.showMoreLessItem}>
                <button
                    onClick={handleListToggle}
                    className={classes.showMoreLessButton}
                    data-cy="FilterList-showMoreLessButton"
                >
                    {label}
                </button>
            </li>
        );
    }, [isListExpanded, handleListToggle, items, itemCountToShow, formatMessage, classes]);

    return (
        <Fragment>
            <ul className={classes.items}>
                {itemElements}
                {showMoreLessItem}
            </ul>
        </Fragment>
    );
};

FilterList.defaultProps = {
    onApply: null,
    itemCountToShow: 5
};

FilterList.propTypes = {
    classes: shape({
        item: string,
        items: string
    }),
    filterApi: shape({}),
    filterState: setValidator,
    group: string,
    items: array,
    onApply: func,
    itemCountToShow: number
};

export default FilterList;
