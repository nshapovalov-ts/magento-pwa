import React from 'react';

import Button from 'components/Button';
import topBanner from './assets/top_slider_bg.jpg';
import screenBanner from './assets/top_slider_img.png';

import classes from './topBanner.module.css';

const TopBanner = () => {
    return (
        <section className={classes.root}>
            <div className={classes.topBannerBackground}>
                <img src={topBanner} alt="Join Australia's fastest growing B2B marketplace" />
            </div>
            <div className={classes.info}>
                <div className={classes.applyBlock}>
                    <h2>
                        Join Australia's
                        <br />
                        fastest growing
                        <br />
                        <strong>B2B marketplace</strong>
                    </h2>
                    <p>
                        Reach 1000's of new buyers across multiple segments including retail,
                        hospitality, corporate and more
                    </p>
                    <Button
                        component="link"
                        variant="contained"
                        to="/seller-apply-for-registration/"
                        classes={{ root: classes.button }}
                    >
                        Apply now
                    </Button>
                </div>
                <div className={classes.screenBlock}>
                    <img src={screenBanner} alt="Tradesquare screenshot" />
                </div>
            </div>
        </section>
    );
};

export default TopBanner;
