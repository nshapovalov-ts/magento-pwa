module.exports = targets => {
    const { specialFeatures } = targets.of('@magento/pwa-buildpack');
    specialFeatures.tap(flags => {
        flags[targets.name] = {
            esModules: true,
            cssModules: true,
            i18n: true
        };
    });

    // routes changes

    targets.of('@magento/venia-ui').routes.tap(routes => {
        // replace default create account route to 404 page
        routes.push({
            name: 'Default SignUpPage',
            pattern: '/create-account',
            path: '@magento/venia-ui/lib/components/MagentoRoute'
        });

        // add new sign up route
        routes.push({
            name: 'SignUpPage',
            pattern: '/sign-up',
            path: require.resolve('./')
        });

        return routes;
    });

    // Commenting out this section when support for the phone_number parameter
    // will be added when creating an account on the server

    // const peregrineTargets = targets.of('@magento/peregrine');
    // const talonsTarget = peregrineTargets.talons;

    // talonsTarget.tap(talonWrapperConfig => {
    //     talonWrapperConfig.CreateAccount.useCreateAccount.wrapWith(
    //         '@pwa/signup/talons/wrapUseCreateAccount'
    //     );
    // });
};
