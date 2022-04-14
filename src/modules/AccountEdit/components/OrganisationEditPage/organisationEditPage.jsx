import React, { useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { Form } from 'informed';

import LoadingIndicator from '@magento/venia-ui/lib/components/LoadingIndicator';
import Button from 'components/Button';
import { ContentLayout } from 'components/Layouts';
import { MODULE_ROUTE_PATH } from '../../constants';
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

import { useCustomerData } from '../../hooks/useCustomerData';
import { useFakePost } from 'common/hooks/useFakeFetch';

import classes from './organisationEditPage.module.css';

const OrganisationEditPage = () => {
    const formApi = useRef();
    const history = useHistory();
    const { isLoading, customerData } = useCustomerData();
    const { isLoading: isBusy, fakePost } = useFakePost();

    // TODO: change to fill form with real data after implementation on server
    useEffect(() => {
        if (customerData) {
            formApi.current.setValues(customerData);
        }
    }, [customerData]);

    const handleSubmit = async values => {
        // TODO: change to real graphql mutation
        await fakePost(null, 3000);
        history.push(`${MODULE_ROUTE_PATH}/finish`, { completed: true });
    };

    return (
        <ContentLayout>
            <div className={classes.container}>
                {(isLoading || isBusy) && <LoadingIndicator global />}
                <Form apiRef={formApi} onSubmit={handleSubmit}>
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
                    <div className={classes.buttonsContainer}>
                        <Button
                            variant="outlined"
                            component="link"
                            size="large"
                            data-cy="back"
                            to={`${MODULE_ROUTE_PATH}/2`}
                        >
                            Back
                        </Button>
                        <div className={classes.submitButton}>
                            <Button
                                variant="contained"
                                type="submit"
                                size="large"
                                data-cy="submit"
                                fullWidth
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                </Form>
            </div>
        </ContentLayout>
    );
};

export default OrganisationEditPage;
