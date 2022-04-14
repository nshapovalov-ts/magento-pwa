import React from 'react';

import AccountInformationPage from '@magento/venia-ui/lib/components/AccountInformationPage';
import Button from 'components/Button';
import { ContentLayout } from 'components/Layouts';
import { MODULE_ROUTE_PATH } from '../../constants';

import classes from './accountEditPage.module.css';

const AccountEditPage = () => {
    return (
        <ContentLayout>
            <AccountInformationPage />
            <div className={classes.buttonsContainer}>
                <div className={classes.submitButton}>
                    <Button
                        variant="contained"
                        component="link"
                        size="large"
                        data-cy="submit"
                        fullWidth
                        to={`${MODULE_ROUTE_PATH}/2`}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </ContentLayout>
    );
};

export default AccountEditPage;
