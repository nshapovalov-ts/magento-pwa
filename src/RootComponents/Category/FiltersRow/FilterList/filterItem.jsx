import React, { useCallback, useMemo } from 'react';
import { bool, func, number, oneOfType, shape, string } from 'prop-types';

import { getLabelTitle } from '../../helpers';
import FilterDefault from './filterDefault';

const FilterItem = props => {
    const { toggleItem, group, groupName, item, onApply, isSelected, isRadio } = props;
    const { title, value } = item;

    // create and memoize an item that matches the tile interface
    const tileItem = useMemo(
        () => ({
            label: getLabelTitle(title, groupName),
            value_index: value
        }),
        [groupName, value, title]
    );

    const handleClick = useCallback(
        e => {
            // use only left click for selection
            if (e.button !== 0) return;

            toggleItem({ group, item });

            if (typeof onApply === 'function') {
                onApply(group, item);
            }
        },
        [group, item, toggleItem, onApply]
    );

    const handleKeyDown = useCallback(
        e => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleItem({ group, item });
                if (typeof onApply === 'function') {
                    onApply(group, item);
                }
            }
        },
        [group, item, onApply, toggleItem]
    );

    return (
        <FilterDefault
            isSelected={isSelected}
            item={tileItem}
            onMouseDown={handleClick}
            onKeyDown={handleKeyDown}
            title={title}
            value={value}
            isRadio={isRadio}
        />
    );
};

FilterItem.propTypes = {
    toggleItem: func.isRequired,
    isSelected: bool,
    group: string.isRequired,
    groupName: string,
    item: shape({
        title: string.isRequired,
        value: oneOfType([number, string]).isRequired
    }).isRequired,
    isRadio: bool
};

export default FilterItem;
