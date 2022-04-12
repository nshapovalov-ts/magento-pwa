import React from 'react';
import { shape, string } from 'prop-types';

import Field from 'components/Field';
import TextInput from 'components/TextInput';

import { useStyle } from '@magento/venia-ui/lib/classify';
import { usePostcode } from '@magento/peregrine/lib/talons/Postcode/usePostcode';

import defaultClasses from './postcode.module.css';

const Postcode = props => {
    const { classes: propClasses, fieldInput, countryCodeField, label, ...inputProps } = props;

    const classes = useStyle(defaultClasses, propClasses);
    const postcodeProps = {
        classes,
        ...inputProps
    };

    usePostcode({ fieldInput, countryCodeField });

    return (
        <Field id={classes.root} label={label} classes={{ root: classes.root }}>
            <TextInput {...postcodeProps} field={fieldInput} id={classes.root} />
        </Field>
    );
};

export default Postcode;

Postcode.defaultProps = {
    fieldInput: 'postcode'
};

Postcode.propTypes = {
    classes: shape({
        root: string
    }),
    label: string
};
