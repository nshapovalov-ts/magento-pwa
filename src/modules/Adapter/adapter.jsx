import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';

import { AppContextProvider } from '@magento/venia-ui/lib/components/App';
import StoreCodeRoute from '@magento/venia-ui/lib/components/StoreCodeRoute';
import App from '../App';

import { useAdapter } from '@magento/peregrine/lib/talons/Adapter/useAdapter';

const Adapter = props => {
    const talonProps = useAdapter(props);
    const { apolloProps, initialized, reduxProps, routerProps, urlHasStoreCode } = talonProps;

    // TODO: Replace with app skeleton. See PWA-547.
    if (!initialized) {
        return null;
    }

    const children = props.children || <App />;
    const storeCodeRouteHandler = urlHasStoreCode ? <StoreCodeRoute /> : null;

    return (
        <ApolloProvider {...apolloProps}>
            <ReduxProvider {...reduxProps}>
                <BrowserRouter {...routerProps}>
                    {storeCodeRouteHandler}
                    <AppContextProvider>{children}</AppContextProvider>
                </BrowserRouter>
            </ReduxProvider>
        </ApolloProvider>
    );
};

export default Adapter;
