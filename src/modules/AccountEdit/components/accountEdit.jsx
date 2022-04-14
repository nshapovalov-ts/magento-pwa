import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { fullPageLoadingIndicator } from '@magento/venia-ui/lib/components/LoadingIndicator';
import { MODULE_ROUTE_PATH } from '../constants';
import AccountEditPage from './AccountEditPage';
import AddressEditPage from './AddressEditPage';
import FinishPage from './FinishPage';
import OrganisationEditPage from './OrganisationEditPage';

import { useAddress } from '../hooks/useAddress';

const AccountEdit = () => {
    const { customerAddresses, isLoading } = useAddress();

    const hasAddress = Array.isArray(customerAddresses) && customerAddresses.length > 0;

    if (isLoading) {
        return fullPageLoadingIndicator;
    }

    return (
        <Switch>
            <Route exact path={`${MODULE_ROUTE_PATH}`}>
                <Redirect to={hasAddress ? `${MODULE_ROUTE_PATH}/3` : `${MODULE_ROUTE_PATH}/2`} />
            </Route>
            <Route exact path={`${MODULE_ROUTE_PATH}/1`}>
                <AccountEditPage />
            </Route>
            <Route exact path={`${MODULE_ROUTE_PATH}/2`}>
                <AddressEditPage />
            </Route>
            <Route exact path={`${MODULE_ROUTE_PATH}/3`}>
                {hasAddress ? <OrganisationEditPage /> : <Redirect to={`${MODULE_ROUTE_PATH}/2`} />}
            </Route>
            <Route exact path={`${MODULE_ROUTE_PATH}/finish`}>
                <FinishPage />
            </Route>
            <Route path="*">
                <Redirect to={`${MODULE_ROUTE_PATH}`} />
            </Route>
        </Switch>
    );
};

export default AccountEdit;
