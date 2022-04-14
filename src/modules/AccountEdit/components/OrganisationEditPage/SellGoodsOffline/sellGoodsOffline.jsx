import React from 'react';

import Heading from 'components/Heading';
import {
    BUTTON_IMAGE_PATH,
    ITEM_TYPES,
    ORGANISATION_PREFERENCES_SECTIONS
} from '../../../constants';
import Item from '../Item';
import { sellGoodsOfflineData } from './sellGoodsOfflineData.js';

import useFieldState from '@magento/peregrine/lib/hooks/hook-wrappers/useInformedFieldStateWrapper';

import classes from './sellGoodsOffline.module.css';

const SellGoodsOffline = () => {
    const { value: sellGoodsValues = [] } = useFieldState(
        ORGANISATION_PREFERENCES_SECTIONS.sellGoods
    );

    const isOfflineActive = sellGoodsValues.includes('5621') || sellGoodsValues.includes('5622');

    if (!isOfflineActive) {
        return null;
    }

    return (
        <section>
            <Heading>Where do you currently sell your goods offline?</Heading>
            <div className={classes.container}>
                {sellGoodsOfflineData.map(item => {
                    const imageSrc = `${BUTTON_IMAGE_PATH}${item.id}.jpg`;

                    return (
                        <Item
                            key={item.id}
                            id={item.id}
                            field={ORGANISATION_PREFERENCES_SECTIONS.sellGoodsOffline}
                            title={item.name}
                            imgSrc={imageSrc}
                            type={ITEM_TYPES.small}
                        />
                    );
                })}
            </div>
        </section>
    );
};

export default SellGoodsOffline;
