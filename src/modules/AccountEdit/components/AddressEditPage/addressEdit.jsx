import React, { memo, useEffect, useState } from 'react';
import { useFormApi } from 'informed';

import LoadingIndicator from '@magento/venia-ui/lib/components/LoadingIndicator';
import Button from 'components/Button';
import Country from 'components/Country';
import Field from 'components/Field';
import GoogleAutocomplete from 'components/GoogleAutocomplete';
import Postcode from 'components/Postcode';
import Region from 'components/Region';
import { GET_REGIONS_QUERY } from 'components/Region/region.gql';
import TextInput from 'components/TextInput';
import { getAddressObject } from 'common/helpers/utils';

import { isRequired } from '@magento/venia-ui/lib/util/formValidators';
import { useRegion } from '@magento/peregrine/lib/talons/Region/useRegion';

import classes from './addressEdit.module.css';

const REGION_FIELD_INPUT = 'region[region]';
const REGION_FIELD_SELECT = 'region[region_id]';
const REGION_VALUE_KEY = 'id';
const COUNTRY_FIELD_NAME = 'country_code';

const AddressEdit = memo(({ customerAddress }) => {
    const [isAddressDetailsOpen, setAddressDetailsOpen] = useState(!!customerAddress);
    const formApi = useFormApi();

    const talonProps = useRegion({
        countryCodeField: COUNTRY_FIELD_NAME,
        fieldInput: REGION_FIELD_INPUT,
        fieldSelect: REGION_FIELD_SELECT,
        optionValueKey: REGION_VALUE_KEY,
        queries: { getRegionsQuery: GET_REGIONS_QUERY }
    });

    const { loading, regions } = talonProps;

    const manualAddressClasses = isAddressDetailsOpen
        ? classes.manualAddress
        : classes.manualAddressHidden;

    const getRegionData = regionString => {
        const region = regions.find(region => region.label === regionString);
        if (region) {
            return {
                region: regionString,
                region_id: `${region.key}`
            };
        }

        return {};
    };

    const updateAddressFields = addressesArray => {
        try {
            const addressObject = getAddressObject(addressesArray);
            setAddressDetailsOpen(true);
            formApi.setValues({ ...addressObject, region: getRegionData(addressObject.region) });
        } catch (error) {
            if (process.env.NODE_ENV !== 'production') {
                console.error(error);
            }
        }
    };

    useEffect(() => {
        if (customerAddress) {
            formApi.setValues({ address: '', ...customerAddress });
        }
    }, [formApi, customerAddress]);

    return (
        <div>
            {loading && <LoadingIndicator global />}
            <Field id="customer-address">
                <GoogleAutocomplete
                    apiKey={process.env.GOOGLE_MAPS_API_KEY}
                    field="address"
                    data-cy="customer-address"
                    placeholder={`Business address`}
                    onSelect={updateAddressFields}
                    validate={isAddressDetailsOpen ? undefined : isRequired}
                />
            </Field>

            {!isAddressDetailsOpen && (
                <div className={classes.manualAddressButton}>
                    <Button type="text" onClick={() => setAddressDetailsOpen(true)}>
                        Enter address manually +
                    </Button>
                </div>
            )}
            <div className={manualAddressClasses}>
                <div className={classes.rowBlock}>
                    <Country
                        field={COUNTRY_FIELD_NAME}
                        label=""
                        data-cy="country"
                        validate={isRequired}
                    />
                    <Field id="city">
                        <TextInput
                            field="city"
                            validate={isRequired}
                            data-cy="city"
                            placeholder={`Business suburb`}
                        />
                    </Field>
                </div>
                <Field id="street1">
                    <TextInput
                        field="street[0]"
                        validate={isRequired}
                        data-cy="street[0]"
                        placeholder={`Business street`}
                    />
                </Field>
                <div className={classes.rowBlock}>
                    <Region
                        countryCodeField={COUNTRY_FIELD_NAME}
                        fieldInput={REGION_FIELD_INPUT}
                        fieldSelect={REGION_FIELD_SELECT}
                        optionValueKey={REGION_VALUE_KEY}
                        label=""
                        validate={isRequired}
                        data-cy="region"
                        placeholder={`Region, state or province`}
                    />
                    <Postcode
                        validate={isRequired}
                        data-cy="Postcode"
                        label=""
                        placeholder={`ZIP/Postal code`}
                        countryCodeField={COUNTRY_FIELD_NAME}
                    />
                </div>
            </div>
        </div>
    );
});

AddressEdit.displayName = 'AddressEdit';

export default AddressEdit;
