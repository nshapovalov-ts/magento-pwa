import React, { useEffect } from 'react';
import { useFieldApi, useFieldState } from 'informed';
import PropTypes from 'prop-types';

import TextInput from 'components/TextInput';

import classes from './priceSlider.module.css';

// TODO: add currency sign in text fields
const PriceSlider = props => {
    const { field, minValue = 0, maxValue, initialMin = 0, initialMax = maxValue, onBlur } = props;

    const { setValue: setMinValue } = useFieldApi(`${field}_from`);
    const { setValue: setMaxValue } = useFieldApi(`${field}_to`);

    useEffect(() => {
        if (initialMin || initialMax) {
            setMinValue(initialMin);
            setMaxValue(initialMax);
        }
    }, [setMinValue, setMaxValue, initialMin, initialMax]);

    const currentMin = useFieldState(`${field}_from`)?.value;
    const currentMax = useFieldState(`${field}_to`)?.value;

    const onChange = type => e => {
        const value = parseInt(e.target.value);
        if (type === 'min') {
            if (value > currentMax) {
                setMaxValue(value);
            }
            setMinValue(value);
        } else {
            if (value < currentMin) {
                setMinValue(value);
            }
            setMaxValue(value);
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
                    initialValue={initialMin || 0}
                    onChange={onChange('min')}
                    value={currentMin}
                    onBlur={onBlur}
                />
                <input
                    className={classes.maxSlider}
                    type="range"
                    min={minValue}
                    max={maxValue}
                    step="1"
                    name={`${field}_to`}
                    initialValue={initialMax || maxValue}
                    onChange={onChange('max')}
                    value={currentMax}
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
