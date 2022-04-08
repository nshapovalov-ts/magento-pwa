import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import CreateAccountPage from './CreateAccountPage';
import SignUpPage from './SignUpPage';

const SignUp = () => {
    const { path } = useRouteMatch();

    return (
        <Switch>
            <Route exact path={path}>
                <SignUpPage />
            </Route>
            <Route path={`${path}/create`}>
                <CreateAccountPage />
            </Route>
        </Switch>
    );
};

export default SignUp;
