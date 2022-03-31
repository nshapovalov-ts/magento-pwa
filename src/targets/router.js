const updateRoutes = targets => {
    targets.of('@magento/venia-ui').routes.tap(routes => {
        routes.push({
            name: 'SignInPage',
            pattern: '/sign-in',
            exact: true,
            path: require.resolve('../modules/SignInPage')
        });

        // Customer menu routes
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

        // Footer pages routes

        routes.push({
            name: 'Buyer Terms',
            pattern: '/buyer-terms',
            exact: true,
            path: require.resolve('../modules/BuyerTermsPage')
        });

        routes.push({
            name: 'Buyer Terms',
            pattern: '/net60-terms',
            exact: true,
            path: require.resolve('../modules/Net60TermsPage')
        });

        routes.push({
            name: 'Privacy Policy',
            pattern: '/privacy-policy',
            exact: true,
            path: require.resolve('../modules/PrivacyPolicyPage')
        });

        routes.push({
            name: 'Privacy Policy',
            pattern: '/zip-business',
            exact: true,
            path: require.resolve('../modules/ZipBusinessPage')
        });

        routes.push({
            name: 'ContactPage',
            pattern: '/contact-us',
            exact: true,
            path: require.resolve('../modules/ContactPage')
        });

        routes.push({
            name: 'AboutUsPage',
            pattern: '/about-us',
            exact: true,
            path: require.resolve('../modules/AboutUsPage')
        });

        routes.push({
            name: 'Sell on Tradesquare',
            pattern: '/seller',
            exact: true,
            path: require.resolve('../modules/SellOnPage')
        });

        return routes;
    });
};

exports.updateRoutes = updateRoutes;
