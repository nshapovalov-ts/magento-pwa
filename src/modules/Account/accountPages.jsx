import React from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';

import OrderHistoryPage from '@magento/venia-ui/lib/components/OrderHistoryPage';
import WishlistPage from '@magento/venia-ui/lib/components/WishlistPage';
import AccountPageLayout from 'components/Layouts';
import AccountInformationPage from '../AccountInformationPage';

const AccountPages = () => {
    return (
        <div>
            <AccountPageLayout>
                <Switch>
                    <Route exact path="/customer/account-information">
                        <AccountInformationPage />
                    </Route>
                    <Route exact path="/customer/order-history">
                        <OrderHistoryPage />
                    </Route>
                    <Route exact path="/customer/wishlist">
                        <WishlistPage />
                    </Route>
                </Switch>
            </AccountPageLayout>
        </div>
    );
};

export default AccountPages;
