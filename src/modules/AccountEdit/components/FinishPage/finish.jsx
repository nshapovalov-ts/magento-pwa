import React from 'react';
import { Redirect, useLocation } from 'react-router-dom';

import Button from 'components/Button';
import { ContentLayout } from 'components/Layouts';
import { MODULE_ROUTE_PATH } from '../../constants';

import classes from './finish.module.css';

const Finish = () => {
    const { state = {} } = useLocation();

    if (!state.completed) {
        return <Redirect to={`${MODULE_ROUTE_PATH}/1`} />;
    }

    return (
        <ContentLayout>
            <div className={classes.container}>
                {/* TODO: add text based on response (first create or update) */}
                <p>Updated data successfully.</p>
                <Button
                    variant="contained"
                    component="link"
                    size="large"
                    data-cy="start-shopping"
                    to="/"
                >
                    Start Shopping
                </Button>
            </div>
        </ContentLayout>
    );
};

export default Finish;
