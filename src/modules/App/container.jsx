import React from 'react';
import { useErrorContext } from '@magento/peregrine/lib/context/unhandledErrors';

import App from './app';
import { useErrorBoundary } from '@magento/venia-ui/lib/components/App/useErrorBoundary';

const AppContainer = () => {
    const ErrorBoundary = useErrorBoundary(App);
    const [unhandledErrors, errorApi] = useErrorContext();

    return (
        <React.StrictMode>
            <ErrorBoundary unhandledErrors={unhandledErrors} {...errorApi} />
        </React.StrictMode>
    );
};

export default AppContainer;
