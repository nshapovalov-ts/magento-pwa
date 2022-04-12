import React, { Fragment } from 'react';
import { ChevronDown as ChevronDownIcon } from 'react-feather';
import { Option as InformedOption, Select as InformedSelect, useFieldState } from 'informed';
import { arrayOf, node, number, oneOfType, shape, string } from 'prop-types';

import Icon from '@magento/venia-ui/lib/components/Icon';
import { FieldIcons, Message } from 'components/Field';

import { useStyle } from '@magento/venia-ui/lib/classify';

import defaultClasses from './select.module.css';

const arrow = <Icon src={ChevronDownIcon} size={24} />;

const Select = props => {
    const { before, classes: propClasses, field, items, placeholder, message, ...rest } = props;
    const fieldState = useFieldState(field);
    const classes = useStyle(defaultClasses, propClasses);
    const inputClass = fieldState.error ? classes.input_error : classes.input;

    const options = items.map(({ disabled = null, hidden = null, label, value, key = value }) => (
        <InformedOption key={key} disabled={disabled} hidden={hidden} value={value}>
            {label || (value != null ? value : '')}
        </InformedOption>
    ));

    return (
        <Fragment>
            <FieldIcons after={arrow} before={before}>
                <InformedSelect {...rest} label={null} className={inputClass} field={field}>
                    <>
                        {placeholder && (
                            <InformedOption disabled value="">
                                {placeholder}
                            </InformedOption>
                        )}
                        {options}
                    </>
                </InformedSelect>
            </FieldIcons>
            <Message fieldState={fieldState}>{message}</Message>
        </Fragment>
    );
};

export default Select;

Select.propTypes = {
    before: node,
    classes: shape({
        input: string
    }),
    field: string.isRequired,
    items: arrayOf(
        shape({
            key: oneOfType([number, string]),
            label: string,
            value: oneOfType([number, string])
        })
    ),
    message: node
};
