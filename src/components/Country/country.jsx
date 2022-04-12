import React from 'react';
import { func, shape, string } from 'prop-types';

import Field from 'components/Field';
import Select from 'components/Select';
import { GET_COUNTRIES_QUERY } from './country.gql';

import { useStyle } from '@magento/venia-ui/lib/classify';
import { useCountry } from '@magento/peregrine/lib/talons/Country/useCountry';

import defaultClasses from './country.module.css';

const Country = props => {
    const talonProps = useCountry({
        queries: {
            getCountriesQuery: GET_COUNTRIES_QUERY
        }
    });
    const { countries, loading } = talonProps;
    const { classes: propClasses, field, label, ...inputProps } = props;

    const classes = useStyle(defaultClasses, propClasses);
    const selectProps = {
        classes,
        disabled: loading,
        field,
        items: countries,
        ...inputProps
    };

    return (
        <Field id={classes.root} label={label} classes={{ root: classes.root }}>
            <Select {...selectProps} id={classes.root} />
        </Field>
    );
};

export default Country;

Country.defaultProps = {
    field: 'country'
};

Country.propTypes = {
    classes: shape({
        root: string
    }),
    field: string,
    label: string,
    validate: func,
    initialValue: string
};
