import React from 'react';
import { Form } from 'informed';

import { ContentLayout } from 'components/Layouts';
import AnnualPurchasing from './AnnualPurchasing';
import BusinessType from './BusinessType/businessType';
import BuyPurpose from './BuyPurpose';
import BuyUsually from './BuyUsually';
import FrequentlyOrder from './FrequentlyOrder';
import Industry from './Industry';
import Lpo from './Lpo';
import Network from './Network';
import PurchasePriorities from './PurchasePriorities';
import SellGoods from './SellGoods';
import SellGoodsOffline from './SellGoodsOffline';
import SellGoodsOnline from './SellGoodsOnline';

import classes from './organisationEditPage.module.css';

const OrganisationEditPage = () => {
    return (
        <ContentLayout>
            <div className={classes.container}>
                <Form>
                    <BusinessType />
                    <Industry />
                    <Lpo />
                    <BuyPurpose />
                    <BuyUsually />
                    <SellGoods />
                    <SellGoodsOffline />
                    <SellGoodsOnline />
                    <Network />
                    <AnnualPurchasing />
                    <FrequentlyOrder />
                    <PurchasePriorities />
                </Form>
            </div>
        </ContentLayout>
    );
};

export default OrganisationEditPage;
