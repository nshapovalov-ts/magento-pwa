import React, { useEffect, useMemo } from 'react';
import { useFieldApi, useFieldState } from 'informed';

import { getPriceValuesFromFilterState, getRangeFromFilterItems } from '../../helpers';
import PriceSlider from '../../PriceSlider';

const FilterPrice = props => {
    const { group, items, filterState, toggleItem } = props;

    const { setValue: setMinValue } = useFieldApi(`${group}_from`);
    const { setValue: setMaxValue } = useFieldApi(`${group}_to`);

    const minValue = useFieldState(`${group}_from`)?.value;
    const maxValue = useFieldState(`${group}_to`)?.value;

    const { from, to } = useMemo(() => getRangeFromFilterItems(items), [items]);
    const initialValues = useMemo(() => getPriceValuesFromFilterState(filterState), [filterState]);

    useEffect(() => {
        if (!filterState || filterState.size === 0) {
            setMinValue(from);
            setMaxValue(to);
        }
    }, [filterState, setMinValue, setMaxValue, from, to]);

    const handleBlur = () => {
        if (minValue > from || maxValue < to) {
            const item = { title: `${minValue}-${maxValue}`, value: `${minValue}_${maxValue}` };
            toggleItem({ group, item });
        }
    };

    return (
        <div>
            <PriceSlider
                field={group}
                minValue={parseInt(from)}
                maxValue={parseInt(to)}
                initialMin={initialValues && parseInt(initialValues.from)}
                initialMax={initialValues && parseInt(initialValues.to)}
                onBlur={handleBlur}
            />
        </div>
    );
};

export default FilterPrice;
