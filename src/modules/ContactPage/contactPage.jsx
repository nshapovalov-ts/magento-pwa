import React, { Fragment, useEffect } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Form } from 'informed';
import { shape, string } from 'prop-types';

import Checkbox from '@magento/venia-ui/lib/components/Checkbox';
import ErrorView from '@magento/venia-ui/lib/components/ErrorView';
import FormError from '@magento/venia-ui/lib/components/FormError';
import { Meta, StoreTitle } from '@magento/venia-ui/lib/components/Head';
import LoadingIndicator from '@magento/venia-ui/lib/components/LoadingIndicator';
import Button from 'components/Button';
import Field from 'components/Field';
import { ContentLayout } from 'components/Layouts';
import TextArea from 'components/TextArea';
import TextInput from 'components/TextInput';
import ContactPageShimmer from './contactPage.shimmer';

import { useStyle } from '@magento/venia-ui/lib/classify';
import { isRequired } from '@magento/venia-ui/lib/util/formValidators';
import { useToasts } from '@magento/peregrine';
import { useContactPage } from '@magento/peregrine/lib/talons/ContactPage';

import defaultClasses from './contactPage.module.css';

const BANNER_IDENTIFIER = 'contact-us-banner';
const SIDEBAR_IDENTIFIER = 'contact-us-sidebar';
const NOT_FOUND_MESSAGE =
    "Looks like the page you were hoping to find doesn't exist. Sorry about that.";

const ContactPage = props => {
    const { classes: propClasses } = props;
    const classes = useStyle(defaultClasses, propClasses);
    const { formatMessage } = useIntl();
    const talonProps = useContactPage({
        cmsBlockIdentifiers: [BANNER_IDENTIFIER, SIDEBAR_IDENTIFIER]
    });
    const [, { addToast }] = useToasts();

    // TODO: need to update the request sent to the server in handleSubmit
    const { isEnabled, errors, handleSubmit, isBusy, isLoading, setFormApi, response } = talonProps;

    useEffect(() => {
        if (response && response.status) {
            addToast({
                type: 'success',
                message: formatMessage({
                    id: 'contactPage.submitMessage',
                    defaultMessage: 'Your message has been sent.'
                }),
                timeout: 5000
            });
        }
    }, [addToast, formatMessage, response]);

    if (!isLoading && !isEnabled) {
        return (
            <Fragment>
                <StoreTitle>
                    {formatMessage({
                        id: 'contactPage.title',
                        defaultMessage: 'Contact Us'
                    })}
                </StoreTitle>
                <ErrorView
                    message={formatMessage({
                        id: 'magentoRoute.routeError',
                        defaultMessage: NOT_FOUND_MESSAGE
                    })}
                />
            </Fragment>
        );
    }

    if (isLoading) {
        return <ContactPageShimmer />;
    }

    const maybeLoadingIndicator = isBusy ? (
        <div className={classes.loadingContainer}>
            <LoadingIndicator>
                <FormattedMessage id={'contactPage.loadingText'} defaultMessage={'Sending'} />
            </LoadingIndicator>
        </div>
    ) : null;

    const pageTitle = formatMessage({
        id: 'contactPage.title',
        defaultMessage: 'Contact Us'
    });

    const metaDescription = formatMessage({
        id: 'contactPage.metaDescription',
        defaultMessage: 'Contact Us'
    });

    return (
        <Fragment>
            <StoreTitle>{pageTitle}</StoreTitle>
            <Meta name="title" content={pageTitle} />
            <Meta name="description" content={metaDescription} />
            <ContentLayout data-cy="ContactPage-root">
                <div className={classes.content}>
                    <div className={classes.formContainer} data-cy="ContactPage-formContainer">
                        {maybeLoadingIndicator}
                        <h1 className={classes.title}>
                            <FormattedMessage
                                id={'contactPage.titleText'}
                                defaultMessage={'Contact Us'}
                            />
                        </h1>

                        <FormError allowErrorMessages errors={Array.from(errors.values())} />
                        <Form getApi={setFormApi} className={classes.form} onSubmit={handleSubmit}>
                            <Field
                                id="contact-email"
                                label={formatMessage({
                                    id: 'global.email',
                                    defaultMessage: 'Email'
                                })}
                                required
                            >
                                <TextInput
                                    autoComplete="email"
                                    field="email"
                                    id="contact-email"
                                    validate={isRequired}
                                    data-cy="email"
                                />
                            </Field>
                            <div className={classes.name}>
                                <Field
                                    id="contact-firstname"
                                    label={formatMessage({
                                        id: 'global.firstName',
                                        defaultMessage: 'First name'
                                    })}
                                    required
                                >
                                    <TextInput
                                        autoComplete="firstname"
                                        field="firstname"
                                        id="contact-firstname"
                                        validate={isRequired}
                                        data-cy="firstname"
                                    />
                                </Field>
                                <Field
                                    id="contact-lastname"
                                    label={formatMessage({
                                        id: 'global.lastName',
                                        defaultMessage: 'Last name'
                                    })}
                                    required
                                >
                                    <TextInput
                                        autoComplete="lastname"
                                        field="lastname"
                                        id="contact-lastname"
                                        validate={isRequired}
                                        data-cy="lastname"
                                    />
                                </Field>
                            </div>

                            <Field
                                id="contact-message"
                                label={formatMessage({
                                    id: 'contactPage.message',
                                    defaultMessage: 'Your message'
                                })}
                                required
                            >
                                <TextArea
                                    autoComplete="message"
                                    field="message"
                                    id="contact-message"
                                    validate={isRequired}
                                    data-cy="message"
                                />
                            </Field>
                            <p>
                                TradeSquare is committed to protecting and respecting your privacy,
                                and we’ll only use your personal information to administer your
                                account and to provide the products and services you requested from
                                us. From time to time, we would like to contact you about our
                                products and services, as well as other content that may be of
                                interest to you. If you consent to us contacting you for this
                                purpose, please tick below to say how you would like us to contact
                                you:
                            </p>
                            <Checkbox
                                field="contact-subscribe"
                                label={formatMessage({
                                    id: 'contactPage.subscribeCheckbox',
                                    defaultMessage:
                                        'I agree to receive other communications from TradeSquare.'
                                })}
                                data-cy="contact-subscribe"
                            />
                            <p>
                                You can unsubscribe from these communications at any time. For more
                                information on how to unsubscribe, our privacy practices, and how we
                                are committed to protecting and respecting your privacy, please
                                review our Privacy Policy.
                            </p>
                            <p>
                                By clicking submit below, you consent to allow TradeSquare to store
                                and process the personal information submitted above to provide you
                                the content requested.
                            </p>
                            <div className={classes.buttonsContainer}>
                                <Button
                                    variant="contained"
                                    primary
                                    type="submit"
                                    disabled={isBusy}
                                    data-cy="submit"
                                >
                                    <FormattedMessage
                                        id={'contactPage.submit'}
                                        defaultMessage={'Submit'}
                                    />
                                </Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </ContentLayout>
        </Fragment>
    );
};

ContactPage.propTypes = {
    classes: shape({
        loadingContainer: string,
        banner: string,
        sideContent: string,
        root: string,
        content: string,
        formContainer: string,
        title: string,
        subtitle: string,
        form: string,
        buttonsContainer: string
    })
};

export default ContactPage;
