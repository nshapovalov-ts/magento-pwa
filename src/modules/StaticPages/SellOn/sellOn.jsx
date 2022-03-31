import React from 'react';

import { Title } from '@magento/venia-ui/lib/components/Head';
import { ContentLayout } from 'components/Layouts';
import ApplyNow from './applyNow';
import CarouselBlock from './carouselBlock';
import DigitalPartner from './digitalPartner';
import EasyStartSteps from './easyStartSteps';
import IntegrationOptions from './integrationOptions';
import StepsBlock from './stepsBlock';
import TopBanner from './topBanner';

const SellOnPage = () => {
    return (
        <>
            <Title>Sell on Tradesquare</Title>
            <article>
                <TopBanner />
                <ContentLayout>
                    <StepsBlock />
                    <EasyStartSteps />
                    <IntegrationOptions />
                    <CarouselBlock />
                    <DigitalPartner />
                    <ApplyNow />
                </ContentLayout>
            </article>
        </>
    );
};

export default SellOnPage;
