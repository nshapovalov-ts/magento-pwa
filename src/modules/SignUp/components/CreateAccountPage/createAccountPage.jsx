import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import { Form } from 'informed';

import FormError from '@magento/venia-ui/lib/components/FormError';
import LoadingIndicator from '@magento/venia-ui/lib/components/LoadingIndicator';
import Button from 'components/Button';
import Field from 'components/Field';
import { ContentLayout } from 'components/Layouts';
import Password from 'components/Password';
import TextInput from 'components/TextInput';

import combine from '@magento/venia-ui/lib/util/combineValidators';
import {
    hasLengthAtLeast,
    isEqualToField,
    isRequired,
    validatePassword
} from '@magento/venia-ui/lib/util/formValidators';
import { useCreateAccount } from '@magento/peregrine/lib/talons/CreateAccount/useCreateAccount';

import classes from './createAccountPage.module.css';

const CreateAccountPage = () => {
    const { state } = useLocation();
    const history = useHistory();
    const { formatMessage } = useIntl();

    const talonProps = useCreateAccount({
        initialValues: undefined,
        onSubmit: () => {
            history.push('/account-edit');
        },
        onCancel: undefined
    });

    if (!state) {
        return <Redirect to="/" />;
    }

    const { errors, handleSubmit, isDisabled } = talonProps;

    return (
        <ContentLayout>
            {isDisabled && <LoadingIndicator global />}
            <div className={classes.container}>
                <h2>
                    <FormattedMessage id={'createAccountPage.title'} />
                </h2>
                <FormError errors={Array.from(errors.values())} allowErrorMessages />
                <Form onSubmit={handleSubmit}>
                    <div className={classes.field}>
                        <Field id="customer-firstname">
                            <TextInput
                                id="customer-firstname"
                                autoComplete="firstname"
                                field="customer.firstname"
                                validate={isRequired}
                                data-cy="firstname"
                                placeholder={formatMessage({
                                    id: 'createAccountPage.firstNamePlaceholder',
                                    defaultMessage: 'First name*'
                                })}
                                initialValue={state.firstname}
                            />
                        </Field>
                    </div>
                    <div className={classes.field}>
                        <Field id="customer-lastname">
                            <TextInput
                                autoComplete="lastname"
                                field="customer.lastname"
                                id="customer-lastname"
                                validate={isRequired}
                                data-cy="lastname"
                                placeholder={formatMessage({
                                    id: 'createAccountPage.lastNamePlaceholder',
                                    defaultMessage: 'Last name*'
                                })}
                            />
                        </Field>
                    </div>
                    <div className={classes.field}>
                        <Field id="customer-email">
                            <TextInput
                                id="customer-email"
                                autoComplete="email"
                                field="customer.email"
                                validate={isRequired}
                                mask={value => value && value.trim()}
                                maskOnBlur={true}
                                data-cy="email"
                                placeholder={formatMessage({
                                    id: 'createAccountPage.emailPlaceholder',
                                    defaultMessage: 'Email*'
                                })}
                                initialValue={state.email}
                            />
                        </Field>
                    </div>
                    <div className={classes.field}>
                        <Field id="customer-phone">
                            <TextInput
                                autoComplete="phone"
                                field="phone"
                                id="customer-phone"
                                validate={isRequired}
                                mask={value => value && value.trim()}
                                maskOnBlur={true}
                                data-cy="phone"
                                placeholder={formatMessage({
                                    id: 'createAccountPage.phonePlaceholder',
                                    defaultMessage: 'Phone number*'
                                })}
                            />
                        </Field>
                    </div>
                    <div className={classes.field}>
                        <Password
                            autoComplete="customer-password"
                            fieldName="password"
                            isToggleButtonHidden={false}
                            validate={combine([
                                isRequired,
                                [hasLengthAtLeast, 8],
                                validatePassword
                            ])}
                            mask={value => value && value.trim()}
                            maskOnBlur={true}
                            data-cy="password"
                            placeholder={formatMessage({
                                id: 'createAccountPage.passwordPlaceholder',
                                defaultMessage: 'Create password*'
                            })}
                        />
                    </div>
                    <div className={classes.field}>
                        <Password
                            autoComplete="customer-password-confirm"
                            fieldName="password-confirm"
                            isToggleButtonHidden={false}
                            validate={combine([
                                isRequired,
                                [hasLengthAtLeast, 8],
                                validatePassword,
                                [isEqualToField, 'password']
                            ])}
                            mask={value => value && value.trim()}
                            maskOnBlur={true}
                            data-cy="password-confirm"
                            placeholder={formatMessage({
                                id: 'createAccountPage.confirmPasswordPlaceholder',
                                defaultMessage: 'Confirm password*'
                            })}
                        />
                    </div>
                    <div className={classes.submitButton}>
                        <Button
                            variant="contained"
                            type="submit"
                            fullWidth
                            size="large"
                            data-cy="submit"
                        >
                            <FormattedMessage
                                id={'createAccountPage.submitButton'}
                                defaultMessage="Next"
                            />
                        </Button>
                    </div>
                </Form>
            </div>
        </ContentLayout>
    );
};

export default CreateAccountPage;
