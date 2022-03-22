const updateRoutes = targets => {
    targets.of('@magento/venia-ui').routes.tap(routes => {
        routes.push({
            name: 'SignInPage',
            pattern: '/sign-in',
            exact: true,
            path: require.resolve('../modules/SignInPage')
        });

        routes.push({
            name: 'My Account',
            pattern: '/account-information',
            exact: true,
            path: require.resolve('../modules/AccountInformationPage'),
            authed: true,
            redirectTo: '/sign-in',
            shimmer: null
        });

        routes.push({
            name: 'My Orders',
            pattern: '/order-history',
            exact: true,
            path: require.resolve('../modules/OrderHistoryPage'),
            authed: true,
            redirectTo: '/sign-in'
        });

        routes.push({
            name: 'Invoices',
            pattern: '/invoices',
            exact: true,
            path: require.resolve('../modules/Account/stub.jsx'),
            authed: true,
            redirectTo: '/sign-in'
        });

        routes.push({
            name: 'Reorder',
            pattern: '/reorder',
            exact: true,
            path: require.resolve('../modules/Account/stub.jsx'),
            authed: true,
            redirectTo: '/sign-in'
        });

        routes.push({
            name: 'Messages',
            pattern: '/communications',
            path: require.resolve('../modules/CommunicationsPage'),
            exact: true,
            authed: true,
            redirectTo: '/sign-in'
        });

        routes.push({
            name: 'Wishlist',
            pattern: '/wishlist',
            exact: true,
            path: require.resolve('../modules/WishlistPage'),
            authed: true,
            redirectTo: '/sign-in',
            shimmer: null
        });

        routes.push({
            name: 'Account Information',
            pattern: '/account-edit',
            exact: true,
            path: require.resolve('../modules/Account/stub.jsx'),
            authed: true,
            redirectTo: '/sign-in'
        });

        routes.push({
            name: 'Reviews',
            pattern: '/reviews',
            exact: true,
            path: require.resolve('../modules/Account/stub.jsx'),
            authed: true,
            redirectTo: '/sign-in'
        });

        return routes;
    });
};

exports.updateRoutes = updateRoutes;
