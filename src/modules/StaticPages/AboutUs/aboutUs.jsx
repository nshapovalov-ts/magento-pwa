import React from 'react';

import { Title } from '@magento/venia-ui/lib/components/Head';
import { ContentLayout } from 'components/Layouts';
import AboutBlockOne from './aboutBlockOne';
import AboutBlockTwo from './aboutBlockTwo';
import topBanner from './assets/top-banner.jpg';
import BottomBlock from './bottomBlock';

import classes from './aboutUs.module.css';

const AboutUsPage = () => {
    return (
        <>
            <Title>About Us</Title>
            <ContentLayout>
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
            </ContentLayout>
        </>
    );
};

export default AboutUsPage;
