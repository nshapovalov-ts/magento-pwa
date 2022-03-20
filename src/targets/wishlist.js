const { Targetables } = require('@magento/pwa-buildpack');

const useSingleWishlistTarget = targets => {
    const targetables = Targetables.using(targets);

    const useSingleWishlist = targetables.esModule(
        '@magento/peregrine/lib/talons/Wishlist/AddToListButton/helpers/useSingleWishlist.js'
    );

    // refetch the number of items in wishlists after each add to wishlist
    useSingleWishlist.insertAfterSource(
        'addProductToWishlistMutation',
        ", { refetchQueries: ['GetCustomerWishlist'] }"
    );
};

exports.useSingleWishlistTarget = useSingleWishlistTarget;
