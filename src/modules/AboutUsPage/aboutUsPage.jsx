import React from 'react';

import { StaticPageLayout } from 'components/Layouts';
import AboutBlockOne from './aboutBlockOne';
import AboutBlockTwo from './aboutBlockTwo';
import topBanner from './assets/top-banner.jpg';
import BottomBlock from './bottomBlock';

import classes from './aboutUsPage.module.css';

const AboutUsPage = () => {
    return (
        <StaticPageLayout>
            <div className={classes.root}>
                <img
                    src={topBanner}
                    className={classes.topImage}
                    alt="We are Tradesquare your wholesaling partner"
                />
                <AboutBlockOne />
                <AboutBlockTwo />
                <BottomBlock />
            </div>
        </StaticPageLayout>
    );
};

export default AboutUsPage;
