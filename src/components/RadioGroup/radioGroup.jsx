import React, { Fragment, useEffect } from 'react';
import { RadioGroup as InformedRadioGroup, useFieldApi } from 'informed';
import { arrayOf, node, number, oneOfType, shape, string } from 'prop-types';

import { Message } from 'components/Field';
import Radio from './radio';

import { useStyle } from '@magento/venia-ui/lib/classify';
import useFieldState from '@magento/peregrine/lib/hooks/hook-wrappers/useInformedFieldStateWrapper';

import defaultClasses from './radioGroup.module.css';

const RadioGroup = props => {
    const {
        children,
        classes: propClasses,
        disabled,
        field,
        id,
        items,
        message,
        fieldValue,
        ...rest
    } = props;
    const fieldApi = useFieldApi(field);
    const fieldState = useFieldState(field);
    const classes = useStyle(defaultClasses, propClasses);

    useEffect(() => {
        if (fieldValue != null && fieldValue !== fieldState.value) {
            fieldApi.setValue(fieldValue);
        }
    }, [fieldApi, fieldState.value, fieldValue]);

    const options =
        children ||
        items.map(({ value, ...item }) => (
            <Radio
                data-cy=""
                key={value}
                disabled={disabled}
                {...item}
                classes={{
                    label: classes.radioLabel,
                    root: classes.radioContainer
                }}
                id={`${field}--${value}`}
                value={value}
            />
        ));

    return (
        <Fragment>
            <div data-cy="RadioGroup-root" className={classes.root}>
                <InformedRadioGroup {...rest} field={field} id={id}>
                    {options}
                </InformedRadioGroup>
            </div>
            <Message className={classes.message} fieldState={fieldState}>
                {message}
            </Message>
        </Fragment>
    );
};

export default RadioGroup;

RadioGroup.propTypes = {
    children: node,
    classes: shape({
        message: string,
        radioContainer: string,
        radioLabel: string,
        root: string
    }),
    field: string.isRequired,
    id: string,
    items: arrayOf(
        shape({
            key: oneOfType([number, string]),
            label: node,
            value: oneOfType([number, string])
        })
    ),
    message: node
};
