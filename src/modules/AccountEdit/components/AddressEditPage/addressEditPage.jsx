import React, { useEffect, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { Form } from 'informed';

import LoadingIndicator, {
    fullPageLoadingIndicator
} from '@magento/venia-ui/lib/components/LoadingIndicator';
import Button from 'components/Button';
import Field from 'components/Field';
import { ContentLayout } from 'components/Layouts';
import TextInput from 'components/TextInput';
import { MODULE_ROUTE_PATH } from '../../constants';
import AddressEdit from './addressEdit';

import { isRequired } from '@magento/venia-ui/lib/util/formValidators';
import { useUserContext } from '@magento/peregrine/lib/context/user';
import { useAddress } from '../../hooks/useAddress';

import classes from './addressEditPage.module.css';

const AddressEditPage = () => {
    const history = useHistory();

    const {
        customerAddresses,
        handleConfirm,
        handleEditAddress,
        isLoading,
        isBusy,
        formProps
    } = useAddress({
        onSubmit: () => {
            history.push(`${MODULE_ROUTE_PATH}/3`);
        }
    });
    const [{ currentUser }] = useUserContext();
    const customerAddress = useMemo(
        () => customerAddresses.find(address => address.default_billing),
        [customerAddresses]
    );

    const handleSubmit = values => {
        const sendData = {
            firstname: currentUser.firstname,
            lastname: currentUser.lastname,
            country_code: values.country_code,
            region: values.region,
            city: values.city,
            street: values.street,
            postcode: values.postcode,
            telephone: '123456789', // TODO: there is no customer custom attributes in current default pwa backend
            default_billing: true
        };

        handleConfirm(sendData);
    };

    useEffect(() => {
        if (customerAddress) {
            handleEditAddress(customerAddress);
        }
    }, [handleEditAddress, customerAddress]);

    if (isLoading) {
        return fullPageLoadingIndicator;
    }

    return (
        <ContentLayout>
            <div className={classes.container}>
                {isBusy && <LoadingIndicator global />}

                <h2>Business details and interest</h2>
                <div className={classes.form}>
                    <Form {...formProps} onSubmit={handleSubmit}>
                        <div className={classes.rowBlock}>
                            <Field id="customer-business-name">
                                <TextInput
                                    id="customer-business-name"
                                    autoComplete="business-name"
                                    field="business-name"
                                    validate={isRequired}
                                    data-cy="business-name"
                                    placeholder={`Business name`}
                                />
                            </Field>
                            <Field id="customer-abn">
                                <TextInput
                                    autoComplete="abn"
                                    field="abn"
                                    id="customer-abn"
                                    validate={isRequired}
                                    mask={value => value && value.trim()}
                                    maskOnBlur={true}
                                    data-cy="abn"
                                    placeholder={`ABN`}
                                />
                            </Field>
                        </div>

                        <AddressEdit customerAddress={customerAddress} />
                        <div className={classes.buttonsContainer}>
                            <Button
                                variant="outlined"
                                component="link"
                                size="large"
                                data-cy="back"
                                to={`${MODULE_ROUTE_PATH}/1`}
                            >
                                Back
                            </Button>
                            <div className={classes.submitButton}>
                                <Button
                                    variant="contained"
                                    type="submit"
                                    size="large"
                                    data-cy="submit"
                                    fullWidth
                                >
                                    Next
                                </Button>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </ContentLayout>
    );
};

export default AddressEditPage;
