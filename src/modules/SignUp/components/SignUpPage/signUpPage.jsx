import React, { useCallback } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Redirect } from 'react-router-dom';

import { ContentLayout } from 'components/Layouts';
import SignUpForm from './form';

import { useUserContext } from '@magento/peregrine/lib/context/user';

import signUpImage from './assets/sign_up_img.png';
import classes from './signUpPage.module.css';

const SignUpPage = () => {
    const intl = useIntl();

    const isTranslateExists = useCallback(
        id => {
            return !!intl.messages[id];
        },
        [intl]
    );

    const [{ isSignedIn }] = useUserContext();

    if (isSignedIn) {
        return <Redirect to="/" />;
    }

    return (
        <div className={classes.root}>
            <ContentLayout>
                <div className={classes.container}>
                    <div className={classes.imageBlock}>
                        <img src={signUpImage} alt="sign up" />
                        <div className={classes.description}>
                            <h2>
                                <FormattedMessage
                                    id={'signUpPage.description'}
                                    defaultMessage={
                                        'To join our <strong>wholesale</strong> buying community, enter your details and start exploring 100,000 products'
                                    }
                                    values={{
                                        strong: str => <strong>{str}</strong>
                                    }}
                                />
                            </h2>
                            <ul className={classes.benefitsList}>
                                <li>
                                    <FormattedMessage id="signUpPage.list1" defaultMessage="" />
                                </li>
                                <li>
                                    <FormattedMessage id="signUpPage.list2" defaultMessage="" />
                                </li>
                                <li>
                                    <FormattedMessage id="signUpPage.list3" defaultMessage="" />
                                </li>
                                <li>
                                    <FormattedMessage id="signUpPage.list4" defaultMessage="" />
                                </li>
                                <li>
                                    <FormattedMessage id="signUpPage.list5" defaultMessage="" />
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className={classes.formBlock}>
                        <h2>
                            <FormattedMessage
                                id={'signUpPage.formTitle'}
                                defaultMessage={
                                    'Welcome to smart <strong>wholesale</strong> buying at your fingertips'
                                }
                                values={{
                                    strong: str => <strong>{str}</strong>
                                }}
                            />
                        </h2>
                        <p>
                            <FormattedMessage
                                id={'signUpPage.formSubtitle'}
                                defaultMessage={
                                    'Join Australia’s fastest growing wholesale network and get access to wholesale pricing for your business.'
                                }
                            />
                        </p>
                        <SignUpForm />
                    </div>
                </div>
            </ContentLayout>
        </div>
    );
};

export default SignUpPage;
