import React from 'react';

import Button from 'components/Button';
import topBanner from './assets/top_banner_bg.jpg';
import topBannerMobile from './assets/top_banner_bg_mobile.png';
import zipLogo from './assets/ZB_Logo_LongForm_Positive_RGB1_png.webp';

import classes from './topBanner.module.css';

const TopBanner = ({ onButtonClick }) => {
    return (
        <section className={classes.root}>
            <div className={classes.topBannerBackground}>
                <img src={topBanner} alt="Freedom starts with fairer cash flow" />
            </div>
            <div className={classes.info}>
                <div className={classes.applyBlock}>
                    <img src={zipLogo} alt="zip business logo" />

                    <h3>
                        Freedom starts with
                        <br />
                        fairer cash flow.
                    </h3>
                    <p>
                        Up to $150,000 interest free - it's buy
                        <br />
                        now, pay later, made for business.
                    </p>
                    <Button
                        variant="contained"
                        classes={{ root: classes.button }}
                        onClick={onButtonClick}
                    >
                        Apply now
                    </Button>
                </div>
            </div>
            <div className={classes.topBannerMobile}>
                <img src={topBannerMobile} alt="Freedom starts with fairer cash flow" />
            </div>
        </section>
    );
};

export default TopBanner;
