import React, { useEffect, useRef } from 'react';
import { useFieldApi, useFieldState } from 'informed';
import PropTypes from 'prop-types';

import CurrencySymbol from '@magento/venia-ui/lib/components/CurrencySymbol';
import TextInput from 'components/TextInput';
import { getSliderBackground } from './helpers';

import classes from './rangeSlider.module.css';

const RangeSlider = props => {
    const {
        field,
        minValue = 0,
        maxValue,
        initialMin = 0,
        initialMax = maxValue,
        currencyCode,
        onStop
    } = props;
    const maxRangeRef = useRef();

    const { setValue: setMinValue } = useFieldApi(`${field}_from`);
    const { setValue: setMaxValue } = useFieldApi(`${field}_to`);

    const currentMin = parseInt(useFieldState(`${field}_from`)?.value || 0);
    const currentMax = parseInt(useFieldState(`${field}_to`)?.value || 0);

    useEffect(() => {
        if (currentMin === minValue && currentMax === maxValue) {
            const background = getSliderBackground(minValue, maxValue);
            maxRangeRef.current.style.background = background;
        }
    }, [currentMin, currentMax, minValue, maxValue]);

    useEffect(() => {
        if (initialMin || initialMax) {
            setMinValue(initialMin);
            setMaxValue(initialMax);

            const background = getSliderBackground({
                currentMin: initialMin,
                currentMax: initialMax,
                minValue,
                maxValue
            });
            maxRangeRef.current.style.background = background;
        }
    }, [setMinValue, setMaxValue, initialMin, initialMax, maxValue, minValue]);

    const onChange = type => e => {
        const value = parseInt(e.target.value);
        if (type === 'min') {
            if (value > currentMax) {
                setMaxValue(value);
            }
            setMinValue(value);

            const background = getSliderBackground({
                currentMin: value,
                currentMax,
                minValue,
                maxValue
            });
            maxRangeRef.current.style.background = background;
        } else {
            if (value < currentMin) {
                setMinValue(value);
            }
            setMaxValue(value);

            const background = getSliderBackground({
                currentMin,
                currentMax: value,
                minValue,
                maxValue
            });
            maxRangeRef.current.style.background = background;
        }
    };

    return (
        <div className={classes.range_slider}>
            <div className={classes.inputs}>
                <TextInput
                    field={`${field}_from`}
                    before={currencyCode && <CurrencySymbol currencyCode={currencyCode} />}
                />
                <TextInput
                    field={`${field}_to`}
                    before={currencyCode && <CurrencySymbol currencyCode={currencyCode} />}
                />
            </div>
            <div className={classes.slider}>
                <input
                    className={classes.minSlider}
                    type="range"
                    min={minValue}
                    max={maxValue}
                    step="1"
                    name={`${field}_from`}
                    initialvalue={initialMin || 0}
                    onChange={onChange('min')}
                    value={currentMin || 0}
                    onMouseUp={onStop}
                    onTouchEnd={onStop}
                />
                <input
                    ref={maxRangeRef}
                    className={classes.maxSlider}
                    type="range"
                    min={minValue}
                    max={maxValue}
                    step="1"
                    name={`${field}_to`}
                    initialvalue={initialMax || maxValue}
                    onChange={onChange('max')}
                    value={currentMax || 0}
                    onMouseUp={onStop}
                    onTouchEnd={onStop}
                />
            </div>
        </div>
    );
};

RangeSlider.propTypes = {
    field: PropTypes.string.isRequired,
    minValue: PropTypes.number,
    maxValue: PropTypes.number.isRequired,
    initialMin: PropTypes.number,
    initialMax: PropTypes.number,
    onStop: PropTypes.func,
    currencyCode: PropTypes.string
};

export default RangeSlider;
