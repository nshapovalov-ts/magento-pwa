import React, { useEffect, useRef } from 'react';
import { useFieldApi, useFieldState } from 'informed';
import PropTypes from 'prop-types';

import TextInput from 'components/TextInput';

import classes from './priceSlider.module.css';

const getStyle = (leftValue, rightValue) => {
    return `linear-gradient(to right, 
    rgb(var(--venia-global-color-gray-300)) ${leftValue}%, 
    rgb(var(--venia-global-color-orange)) ${leftValue}%, 
    rgb(var(--venia-global-color-orange)) ${rightValue}%, 
    rgb(var(--venia-global-color-gray-300)) ${rightValue}%)`;
};

// TODO: add currency sign in text fields
const PriceSlider = props => {
    const { field, minValue = 0, maxValue, initialMin = 0, initialMax = maxValue, onBlur } = props;

    const maxRangeRef = useRef();

    const { setValue: setMinValue } = useFieldApi(`${field}_from`);
    const { setValue: setMaxValue } = useFieldApi(`${field}_to`);

    const currentMin = parseInt(useFieldState(`${field}_from`)?.value || 0);
    const currentMax = parseInt(useFieldState(`${field}_to`)?.value || 0);

    useEffect(() => {
        if (currentMin === minValue && currentMax === maxValue) {
            const background = getStyle(minValue, maxValue);
            maxRangeRef.current.style.background = background;
        }
    }, [currentMin, currentMax, minValue, maxValue]);

    useEffect(() => {
        if (initialMin || initialMax) {
            setMinValue(initialMin);
            setMaxValue(initialMax);
            const leftValue = (((initialMin - minValue) / (maxValue - minValue)) * 100).toFixed(2);
            const rightValue = ((initialMax / maxValue) * 100).toFixed(2);
            const background = getStyle(leftValue, rightValue);
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

            const leftValue = (((value - minValue) / (maxValue - minValue)) * 100).toFixed(2);
            const rightValue = ((currentMax / maxValue) * 100).toFixed(2);
            const background = getStyle(leftValue, rightValue);
            maxRangeRef.current.style.background = background;
        } else {
            if (value < currentMin) {
                setMinValue(value);
            }
            setMaxValue(value);
            const leftValue = (((currentMin - minValue) / (maxValue - minValue)) * 100).toFixed(2);
            const rightValue = ((value / maxValue) * 100).toFixed(2);
            const background = getStyle(leftValue, rightValue);
            maxRangeRef.current.style.background = background;
        }
    };

    return (
        <div className={classes.range_slider}>
            <div className={classes.inputs}>
                <TextInput field={`${field}_from`} />
                <TextInput field={`${field}_to`} />
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
                    onBlur={onBlur}
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
                    onBlur={onBlur}
                />
            </div>
        </div>
    );
};

PriceSlider.propTypes = {
    field: PropTypes.string.isRequired,
    minValue: PropTypes.number,
    maxValue: PropTypes.number.isRequired,
    initialMin: PropTypes.number,
    initialMax: PropTypes.number,
    onBlur: PropTypes.func
};

export default PriceSlider;
