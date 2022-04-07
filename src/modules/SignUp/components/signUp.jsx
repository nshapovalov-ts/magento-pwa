import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import CustomerCreatePage from './CustomerCreatePage';
import SignUpPage from './SignUpPage';

const SignUp = () => {
    const { path } = useRouteMatch();

    return (
        <Switch>
            <Route exact path={path}>
                <SignUpPage />
            </Route>
            <Route path={`${path}/create`}>
                <CustomerCreatePage />
            </Route>
        </Switch>
    );
};

export default SignUp;
