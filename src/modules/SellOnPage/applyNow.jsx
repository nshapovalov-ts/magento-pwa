import React from 'react';

import Button from 'components/Button';

import classes from './applyNow.module.css';

// TODO: create form for page /seller-apply-for-registration/

const ApplyNow = () => {
    return (
        <section className={classes.root}>
            <h2>
                Apply to Sell
                <br /> on TradeSquare
            </h2>
            <div>
                <Button
                    component="link"
                    variant="contained"
                    to="/seller-apply-for-registration/"
                    classes={{ root: classes.button }}
                >
                    Apply now
                </Button>
            </div>
        </section>
    );
};

export default ApplyNow;
