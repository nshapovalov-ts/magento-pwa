module.exports = targets => {
    const builtins = targets.of('@magento/pwa-buildpack');

    builtins.specialFeatures.tap(features => {
        features[targets.name] = { esModules: true, cssModules: true, i18n: true };
    });

    // routes changes

    targets.of('@magento/venia-ui').routes.tap(routes => {
        // add new sign up route
        routes.push({
            name: 'Account Information',
            pattern: '/account-edit',
            path: require.resolve('./index.js'),
            authed: true,
            redirectTo: '/sign-in'
        });

        return routes;
    });
};
