const { Targetables } = require('@magento/pwa-buildpack');

const useAccountMenuItemsTarget = targets => {
    const targetables = Targetables.using(targets);

    const useAccountMenuItems = targetables.esModule(
        '@magento/peregrine/lib/talons/AccountMenu/useAccountMenuItems.js'
    );

    useAccountMenuItems.addImport("{ User } from 'react-feather';");
    useAccountMenuItems.addImport("{ ShoppingBag } from 'react-feather';");
    useAccountMenuItems.addImport("{ FileText } from 'react-feather';");
    useAccountMenuItems.addImport("{ RotateCw } from 'react-feather';");
    useAccountMenuItems.addImport("{ MessageSquare } from 'react-feather';");
    useAccountMenuItems.addImport("{ Heart } from 'react-feather';");
    useAccountMenuItems.addImport("{ Info } from 'react-feather';");
    useAccountMenuItems.addImport("{ Star } from 'react-feather';");

    useAccountMenuItems.insertBeforeSource(
        'const MENU_ITEMS = [',
        `const MENU_ITEMS = [
            {
                name: 'My Account',
                id: 'accountMenu.accountInfoLink',
                url: '/account-information',
                icon: User
            },
            {
                name: 'My Orders',
                id: 'accountMenu.orderHistoryLink',
                url: '/order-history',
                icon: ShoppingBag
            },
            {
                name: 'Invoices',
                id: 'accountMenu.savedPaymentsLink',
                url: '/invoices',
                icon: FileText
            },
            {
                name: 'Reorder',
                id: 'accountMenu.orderHistoryLink',
                url: '/reorder',
                icon: RotateCw
            },
            {
                name: 'Messages',
                id: 'accountMenu.communicationsLink',
                url: '/communications',
                icon: MessageSquare
            },
            {
                name: 'My Wish List',
                id: 'accountMenu.favoritesListsLink',
                url: '/wishlist',
                icon: Heart
            },
            {
                name: 'Account Information',
                id: 'accountMenu.addressBookLink',
                url: '/account-edit',
                icon: Info
            },
            {
                name: 'My Product Reviews',
                id: 'accountMenu.savedPaymentsLink',
                url: '/reviews',
                icon: Star
            }
        ];`,
        { remove: 1069 }
    );
};

exports.useAccountMenuItemsTarget = useAccountMenuItemsTarget;
