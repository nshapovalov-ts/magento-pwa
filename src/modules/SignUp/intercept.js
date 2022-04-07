module.exports = targets => {
    targets.of('@magento/venia-ui').routes.tap(routes => {
        routes.push({
            name: 'Default SignUpPage',
            pattern: '/create-account',
            path: '@magento/venia-ui/lib/components/MagentoRoute'
        });

        routes.push({
            name: 'SignUpPage',
            pattern: '/sign-up',
            path: require.resolve('./')
        });

        return routes;
    });

    const { specialFeatures } = targets.of('@magento/pwa-buildpack');
    specialFeatures.tap(flags => {
        flags[targets.name] = {
            esModules: true,
            cssModules: true,
            i18n: true
        };
    });
};
