import React, { useRef } from 'react';

import { Title } from '@magento/venia-ui/lib/components/Head';
import { ContentLayout } from 'components/Layouts';
import EasySteps from './easySteps';
import FAQ from './FAQ';
import TopBanner from './topBanner';
import ZipAccounts from './ZipAccounts';

const ZipBusinessPage = () => {
    const accountsRef = useRef();

    // scrolls to accounts table on apply button click in top banner
    const handleTopBannerClick = () => {
        accountsRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            <Title>Zip Business Offer</Title>
            <div>
                <TopBanner onButtonClick={handleTopBannerClick} />
                <ContentLayout>
                    <EasySteps />
                </ContentLayout>
                <ZipAccounts ref={accountsRef} />
                <FAQ />
            </div>
        </>
    );
};

export default ZipBusinessPage;
