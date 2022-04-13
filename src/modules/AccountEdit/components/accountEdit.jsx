import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';

import { fullPageLoadingIndicator } from '@magento/venia-ui/lib/components/LoadingIndicator';
import AccountEditPage from './AccountEditPage';
import AddressEditPage from './AddressEditPage';
import OrganisationEditPage from './OrganisationEditPage';

import { useAddress } from '../hooks/useAddress';

const AccountEdit = () => {
    const { path } = useRouteMatch();

    const { customerAddresses, isLoading } = useAddress();

    const hasAddress = Array.isArray(customerAddresses) && customerAddresses.length > 0;

    if (isLoading) {
        return fullPageLoadingIndicator;
    }

    return (
        <Switch>
            <Route exact path={`${path}`}>
                <Redirect to={hasAddress ? `${path}/3` : `${path}/2`} />
            </Route>
            <Route exact path={`${path}/1`}>
                <AccountEditPage />
            </Route>
            <Route exact path={`${path}/2`}>
                <AddressEditPage />
            </Route>
            <Route exact path={`${path}/3`}>
                {hasAddress ? <OrganisationEditPage /> : <Redirect to={`${path}/2`} />}
            </Route>
            <Route path="*">
                <Redirect to={`${path}`} />
            </Route>
        </Switch>
    );
};

export default AccountEdit;
