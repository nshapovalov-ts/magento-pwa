import React, { useEffect, useMemo } from 'react';
import {
    AlertCircle as AlertCircleIcon,
    ArrowRight as SubmitIcon,
    Search as SearchIcon
} from 'react-feather';
import { FormattedMessage, useIntl } from 'react-intl';
import { Form } from 'informed';
import { shape, string } from 'prop-types';

import { StoreTitle } from '@magento/venia-ui/lib/components/Head';
import Icon from '@magento/venia-ui/lib/components/Icon';
import LoadingIndicator from '@magento/venia-ui/lib/components/LoadingIndicator';
import OrderRow from '@magento/venia-ui/lib/components/OrderHistoryPage/orderRow';
import ResetButton from '@magento/venia-ui/lib/components/OrderHistoryPage/resetButton';
import Button from 'components/Button';
import { AccountPageLayout } from 'components/Layouts';
import TextInput from 'components/TextInput';

import { useStyle } from '@magento/venia-ui/lib/classify';
import OrderHistoryContextProvider from '@magento/peregrine/lib/talons/OrderHistoryPage/orderHistoryContext';
import { useOrderHistoryPage } from '@magento/peregrine/lib/talons/OrderHistoryPage/useOrderHistoryPage';
import { useToasts } from '@magento/peregrine/lib/Toasts';

import defaultClasses from '@magento/venia-ui/lib/components/OrderHistoryPage/orderHistoryPage.module.css';

const errorIcon = (
    <Icon
        src={AlertCircleIcon}
        attrs={{
            width: 18
        }}
    />
);
const searchIcon = <Icon src={SearchIcon} size={24} />;

const OrderHistoryPage = props => {
    const talonProps = useOrderHistoryPage();
    const {
        errorMessage,
        loadMoreOrders,
        handleReset,
        handleSubmit,
        isBackgroundLoading,
        isLoadingWithoutData,
        orders,
        pageInfo,
        searchText
    } = talonProps;
    const [, { addToast }] = useToasts();
    const { formatMessage } = useIntl();
    const PAGE_TITLE = formatMessage({
        id: 'orderHistoryPage.pageTitleText',
        defaultMessage: 'Order History'
    });
    const SEARCH_PLACE_HOLDER = formatMessage({
        id: 'orderHistoryPage.search',
        defaultMessage: 'Search by Order Number'
    });
    const classes = useStyle(defaultClasses, props.classes);

    const orderRows = useMemo(() => {
        return orders.map(order => {
            return <OrderRow key={order.id} order={order} />;
        });
    }, [orders]);

    const pageContents = useMemo(() => {
        if (isLoadingWithoutData) {
            return <LoadingIndicator />;
        } else if (!isBackgroundLoading && searchText && !orders.length) {
            return (
                <h3 className={classes.emptyHistoryMessage}>
                    <FormattedMessage
                        id={'orderHistoryPage.invalidOrderNumber'}
                        defaultMessage={`Order "${searchText}" was not found.`}
                        values={{
                            number: searchText
                        }}
                    />
                </h3>
            );
        } else if (!isBackgroundLoading && !orders.length) {
            return (
                <h3 className={classes.emptyHistoryMessage}>
                    <FormattedMessage
                        id={'orderHistoryPage.emptyDataMessage'}
                        defaultMessage={"You don't have any orders yet."}
                    />
                </h3>
            );
        } else {
            return (
                <ul
                    className={classes.orderHistoryTable}
                    data-cy="OrderHistoryPage-orderHistoryTable"
                >
                    {orderRows}
                </ul>
            );
        }
    }, [
        classes.emptyHistoryMessage,
        classes.orderHistoryTable,
        isBackgroundLoading,
        isLoadingWithoutData,
        orderRows,
        orders.length,
        searchText
    ]);

    const resetButtonElement = searchText ? <ResetButton onReset={handleReset} /> : null;

    const submitIcon = (
        <Icon
            src={SubmitIcon}
            size={24}
            classes={{
                icon: classes.submitIcon
            }}
        />
    );

    const pageInfoLabel = pageInfo ? (
        <FormattedMessage
            defaultMessage={'Showing {current} of {total}'}
            id={'orderHistoryPage.pageInfo'}
            values={pageInfo}
        />
    ) : null;

    const loadMoreButton = loadMoreOrders ? (
        <Button
            classes={{ root_lowPriority: classes.loadMoreButton }}
            disabled={isBackgroundLoading || isLoadingWithoutData}
            onClick={loadMoreOrders}
            priority="low"
        >
            <FormattedMessage id={'orderHistoryPage.loadMore'} defaultMessage={'Load More'} />
        </Button>
    ) : null;

    useEffect(() => {
        if (errorMessage) {
            addToast({
                type: 'error',
                icon: errorIcon,
                message: errorMessage,
                dismissable: true,
                timeout: 10000
            });
        }
    }, [addToast, errorMessage]);

    return (
        <OrderHistoryContextProvider>
            <AccountPageLayout>
                <div className={classes.root}>
                    <StoreTitle>{PAGE_TITLE}</StoreTitle>
                    <h1 className={classes.heading}>{PAGE_TITLE}</h1>
                    <div className={classes.filterRow}>
                        <span className={classes.pageInfo}>{pageInfoLabel}</span>
                        <Form className={classes.search} onSubmit={handleSubmit}>
                            <TextInput
                                after={resetButtonElement}
                                before={searchIcon}
                                field="search"
                                id={classes.search}
                                placeholder={SEARCH_PLACE_HOLDER}
                            />
                            <Button
                                className={classes.searchButton}
                                disabled={isBackgroundLoading || isLoadingWithoutData}
                                priority={'high'}
                                type="submit"
                            >
                                {submitIcon}
                            </Button>
                        </Form>
                    </div>
                    {pageContents}
                    {loadMoreButton}
                </div>
            </AccountPageLayout>
        </OrderHistoryContextProvider>
    );
};

export default OrderHistoryPage;

OrderHistoryPage.propTypes = {
    classes: shape({
        root: string,
        heading: string,
        emptyHistoryMessage: string,
        orderHistoryTable: string,
        search: string,
        searchButton: string,
        submitIcon: string,
        loadMoreButton: string
    })
};
