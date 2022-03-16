import React, { useEffect } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Form } from 'informed';
import { shape, string } from 'prop-types';

import { useStyle } from '@magento/venia-ui/lib/classify';
import { isRequired } from '@magento/venia-ui/lib/util/formValidators';
import { useToasts } from '@magento/peregrine';
import { useNewsletter } from '@magento/peregrine/lib/talons/Newsletter/useNewsletter';

import FormError from '@magento/venia-ui/lib/components/FormError';
import LoadingIndicator from '@magento/venia-ui/lib/components/LoadingIndicator';
import Shimmer from '@magento/venia-ui/lib/components/Newsletter/newsletter.shimmer';
import TextInput from '@magento/venia-ui/lib/components/TextInput';
import Button from 'components/Button';
import Field from 'components/Field';

import defaultClasses from './newsletter.module.css';

const Newsletter = props => {
    const { formatMessage } = useIntl();
    const classes = useStyle(defaultClasses, props.classes);
    const talonProps = useNewsletter();
    const [, { addToast }] = useToasts();
    const {
        isEnabled,
        errors,
        handleSubmit,
        isBusy,
        isLoading,
        setFormApi,
        newsLetterResponse,
        clearErrors
    } = talonProps;

    useEffect(() => {
        if (newsLetterResponse && newsLetterResponse.status) {
            addToast({
                type: 'success',
                message: formatMessage({
                    id: 'newsletter.subscribeMessage',
                    defaultMessage: 'The email address is subscribed.'
                }),
                timeout: 5000
            });
        }
    }, [addToast, formatMessage, newsLetterResponse]);

    if (isLoading) {
        return <Shimmer />;
    }

    if (!isEnabled) {
        return null;
    }

    const maybeLoadingIndicator = isBusy ? (
        <div className={classes.loadingContainer}>
            <LoadingIndicator>
                <FormattedMessage
                    id={'newsletter.loadingText'}
                    defaultMessage={'Subscribing'}
                />
            </LoadingIndicator>
        </div>
    ) : null;

    return (
        <div className={classes.root} data-cy={'Newsletter-root'}>
            {maybeLoadingIndicator}
            <span className={classes.title}>Subscribe to Learning</span>

            <p className={classes.newsletter_text}>
                Subscribe to receive news on latest campaigns, promotions, and
                learning to grow your business.
            </p>
            <FormError
                allowErrorMessages
                errors={Array.from(errors.values())}
            />
            <Form
                getApi={setFormApi}
                className={classes.form}
                onSubmit={handleSubmit}
            >
                <Field
                    id="email"
                    label={formatMessage({
                        id: 'global.email',
                        defaultMessage: 'Email'
                    })}
                    className={classes.emailInput}
                >
                    <TextInput
                        autoComplete="email"
                        field="email"
                        id="email"
                        validate={isRequired}
                        placeholder="Your email address"
                    />
                </Field>
                <Button
                    variant="contained"
                    size="small"
                    type="submit"
                    disabled={isBusy}
                    onClick={clearErrors}
                    className={classes.buttonSubmit}
                >
                    <FormattedMessage
                        id={'newsletter.subscribeText'}
                        defaultMessage={'Subscribe'}
                    />
                </Button>
            </Form>
        </div>
    );
};

Newsletter.propTypes = {
    classes: shape({
        modal_active: string,
        root: string,
        title: string,
        form: string,
        buttonsContainer: string
    })
};

export default Newsletter;
