import React, { useEffect, useMemo } from 'react';
import { useFieldApi, useFieldState } from 'informed';

import RangeSlider from 'components/RangeSlider';
import { getPriceValuesFromFilterState, getRangeFromFilterItems } from '../../helpers';

const FilterPrice = props => {
    const { group, items, filterState, toggleItem } = props;

    const { setValue: setMinValue } = useFieldApi(`${group}_from`);
    const { setValue: setMaxValue } = useFieldApi(`${group}_to`);

    const currentMin = useFieldState(`${group}_from`)?.value;
    const currentMax = useFieldState(`${group}_to`)?.value;

    const { minValue, maxValue } = useMemo(() => getRangeFromFilterItems(items), [items]);
    const initialValues = useMemo(() => getPriceValuesFromFilterState(filterState), [filterState]);

    useEffect(() => {
        if (!filterState || filterState.size === 0) {
            setMinValue(minValue);
            setMaxValue(maxValue);
        }
    }, [filterState, setMinValue, setMaxValue, minValue, maxValue]);

    const handleSliderStop = () => {
        if (currentMin > minValue || currentMax < maxValue) {
            const item = {
                title: `${currentMin}-${currentMax}`,
                value: `${currentMin}_${currentMax}`
            };
            toggleItem({ group, item });
        }
    };

    return (
        <div>
            <RangeSlider
                field={group}
                minValue={minValue}
                maxValue={maxValue}
                initialMin={initialValues && parseInt(initialValues.from)}
                initialMax={initialValues && parseInt(initialValues.to)}
                onStop={handleSliderStop}
            />
        </div>
    );
};

export default FilterPrice;
