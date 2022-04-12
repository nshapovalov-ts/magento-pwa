import React from 'react';
import { func, number, oneOfType, shape, string } from 'prop-types';

import Field from 'components/Field';
import Select from 'components/Select';
import TextInput from 'components/TextInput';
import { GET_REGIONS_QUERY } from './region.gql';

import { useStyle } from '@magento/venia-ui/lib/classify';
import { useRegion } from '@magento/peregrine/lib/talons/Region/useRegion';

/**
 * Form component for Region that is seeded with backend data.
 *
 * @param {string} props.optionValueKey - Key to use for returned option values. In a future release, this will be removed and hard-coded to use "id" once GraphQL has resolved MC-30886.
 */
const Region = props => {
    const {
        classes: propClasses,
        countryCodeField,
        fieldInput,
        fieldSelect,
        optionValueKey,
        label,
        ...inputProps
    } = props;

    const talonProps = useRegion({
        countryCodeField,
        fieldInput,
        fieldSelect,
        optionValueKey,
        queries: { getRegionsQuery: GET_REGIONS_QUERY }
    });
    const { loading, regions } = talonProps;

    const classes = useStyle(propClasses);
    const regionProps = {
        classes,
        disabled: loading,
        ...inputProps
    };

    const regionField =
        regions.length || loading ? (
            <Select {...regionProps} field={fieldSelect} id={classes.root} items={regions} />
        ) : (
            <TextInput {...regionProps} field={fieldInput} id={classes.root} />
        );

    return (
        <Field id={classes.root} label={label} classes={{ root: classes.root }}>
            {regionField}
        </Field>
    );
};

export default Region;

Region.defaultProps = {
    countryCodeField: 'country',
    fieldInput: 'region',
    fieldSelect: 'region',
    optionValueKey: 'code'
};

Region.propTypes = {
    classes: shape({
        root: string
    }),
    countryCodeField: string,
    fieldInput: string,
    fieldSelect: string,
    optionValueKey: string,
    label: string,
    validate: func,
    initialValue: oneOfType([number, string])
};
