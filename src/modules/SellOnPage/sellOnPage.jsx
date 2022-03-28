import React from 'react';

import { StaticPageLayout } from 'components/Layouts';
import ApplyNow from './applyNow';
import DigitalPartner from './digitalPartner';
import EasyStartSteps from './easyStartSteps';
import StepsBlock from './stepsBlock';

import classes from './sellOnPage.module.css';

const SellOnPage = () => {
    return (
        <article className={classes.root}>
            <StaticPageLayout>
                <StepsBlock />
                <EasyStartSteps />
                <DigitalPartner />
                <ApplyNow />
            </StaticPageLayout>
        </article>
    );
};

export default SellOnPage;
