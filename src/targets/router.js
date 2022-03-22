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
            pattern: '/customer/account-information',
            exact: true,
            path: '@magento/venia-ui/lib/components/AccountInformationPage',
            authed: true,
            redirectTo: '/sign-in'
        });

        routes.push({
            name: 'My Orders',
            pattern: '/customer/order-history',
            exact: true,
            path: '@magento/venia-ui/lib/components/OrderHistoryPage',
            authed: true,
            redirectTo: '/sign-in'
        });

        routes.push({
            name: 'Invoices',
            pattern: '/customer/invoices',
            exact: true,
            path: require.resolve('../modules/Account/stub.jsx'),
            authed: true,
            redirectTo: '/sign-in'
        });

        routes.push({
            name: 'Reorder',
            pattern: '/customer/reorder',
            exact: true,
            path: require.resolve('../modules/Account/stub.jsx'),
            authed: true,
            redirectTo: '/sign-in'
        });

        routes.push({
            name: 'Messages',
            pattern: '/customer/communications',
            path: '@magento/venia-ui/lib/components/CommunicationsPage',
            exact: true,
            authed: true,
            redirectTo: '/sign-in'
        });

        routes.push({
            name: 'Wishlist',
            pattern: '/customer/wishlist',
            exact: true,
            path: '@magento/venia-ui/lib/components/WishlistPage',
            authed: true,
            redirectTo: '/sign-in'
        });

        routes.push({
            name: 'Account Information',
            pattern: '/customer/account-edit',
            exact: true,
            path: require.resolve('../modules/Account/stub.jsx'),
            authed: true,
            redirectTo: '/sign-in'
        });

        routes.push({
            name: 'Reviews',
            pattern: '/customer/reviews',
            exact: true,
            path: require.resolve('../modules/Account/stub.jsx'),
            authed: true,
            redirectTo: '/sign-in'
        });

        return routes;
    });
};

exports.updateRoutes = updateRoutes;