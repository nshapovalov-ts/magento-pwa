import React from 'react';

import { StaticPageLayout } from 'components/Layouts';
import ApplyNow from './applyNow';
import CarouselBlock from './carouselBlock';
import DigitalPartner from './digitalPartner';
import EasyStartSteps from './easyStartSteps';
import IntegrationOptions from './integrationOptions';
import StepsBlock from './stepsBlock';
import TopBanner from './topBanner';

const SellOnPage = () => {
    return (
        <article>
            <TopBanner />
            <StaticPageLayout>
                <StepsBlock />
                <EasyStartSteps />
                <IntegrationOptions />
                <CarouselBlock />
                <DigitalPartner />
                <ApplyNow />
            </StaticPageLayout>
        </article>
    );
};

export default SellOnPage;
