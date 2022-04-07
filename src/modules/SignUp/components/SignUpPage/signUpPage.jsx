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
                                {[...Array(5).keys()].map(item => {
                                    if (isTranslateExists(`signUpPage.list${item + 1}`)) {
                                        return (
                                            <li key={item}>
                                                <FormattedMessage
                                                    id={`signUpPage.list${item + 1}`}
                                                />
                                            </li>
                                        );
                                    }

                                    return null;
                                })}
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
