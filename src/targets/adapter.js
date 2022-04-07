const { Targetables } = require('@magento/pwa-buildpack');

const addRestSupportApollo = targets => {
    const targetables = Targetables.using(targets);

    const useAdapter = targetables.esModule('@magento/peregrine/lib/talons/Adapter/useAdapter.js');

    useAdapter.addImport("{ RestLink } from 'apollo-link-rest';");

    useAdapter.insertBeforeSource(
        'const mutationQueueLink',
        `\nconst restLink = useMemo(() => new RestLink({ uri: process.env.MAGENTO_BACKEND_URL }), []);\n`
    );

    useAdapter.insertAfterSource(
        'ApolloLink.from([',
        `\n
        mutationQueueLink,
        retryLink,
        authLink,
        magentoGqlCacheLink,
        storeLink,
        errorLink,
        restLink,
        httpLink
    ]),
[
    authLink,
    errorLink,
    restLink,
    httpLink,
    magentoGqlCacheLink,
    mutationQueueLink,
    retryLink,
    storeLink
],`,
        { remove: 546 }
    );
};

exports.addRestSupportApollo = addRestSupportApollo;
