import React from 'react';
import classNames from 'classnames';
import { Input, useFieldApi, useFieldState } from 'informed';
import PropTypes from 'prop-types';

import { ITEM_TYPES } from '../../../constants.js';

import classes from './item.module.css';

const getClassName = type => {
    if (type === ITEM_TYPES.small) {
        return classes.smallItem;
    }
    if (type === ITEM_TYPES.image) {
        return classes.imageItem;
    }

    if (type === ITEM_TYPES.text) {
        return classes.textItem;
    }

    return classes.bigItem;
};

const Item = ({ id, field, title, imgSrc, type, multiple }) => {
    const { value: originalValue } = useFieldState(field);
    const value = originalValue || [];
    const { setValue } = useFieldApi(field);
    const isActive = !!value.find(item => item === id);

    const className = classNames(getClassName(type), { active: isActive });

    const handleChange = e => {
        if (e.target.checked) {
            const newVal = value.length && multiple ? [...value, id] : [id];
            setValue(newVal);
        } else {
            const newVal = value.filter(item => item !== id);
            setValue(newVal);
        }
    };

    return (
        <label htmlFor={`${field}_${id}`} className={className}>
            <Input
                type="checkbox"
                tabIndex={0}
                className={classes.checkbox}
                id={`${field}_${id}`}
                field={field}
                checked={isActive}
                onChange={handleChange}
            />
            {imgSrc && <img src={imgSrc} alt={title} />}
            <span className={classes.text}>{title}</span>
        </label>
    );
};

Item.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    imgSrc: PropTypes.string,
    type: PropTypes.oneOf(['big', 'small', 'text', 'image']),
    active: PropTypes.bool,
    field: PropTypes.string.isRequired,
    multiple: PropTypes.bool
};

export default Item;
