import React from 'react';
import { FormattedMessage } from 'react-intl';
import { bool, node, shape, string } from 'prop-types';

import { useStyle } from '@magento/venia-ui/lib/classify';

import defaultClasses from './field.module.css';

const Field = props => {
    const { children, id, label, optional, required } = props;
    const classes = useStyle(defaultClasses, props.classes);
    const optionalSymbol =
        optional && !required ? (
            <span className={classes.optional}>
                <FormattedMessage id={'field.optional'} defaultMessage={'Optional'} />
            </span>
        ) : null;

    const requiredSymbol =
        required && !optional ? <span className={classes.required}>*</span> : null;

    return (
        <div className={classes.root}>
            {label && (
                <label className={classes.label} htmlFor={id}>
                    {label}
                    {requiredSymbol}
                    {optionalSymbol}
                </label>
            )}
            {children}
        </div>
    );
};

Field.propTypes = {
    children: node,
    classes: shape({
        label: string,
        root: string
    }),
    id: string,
    label: node,
    optional: bool,
    required: bool
};

export default Field;
