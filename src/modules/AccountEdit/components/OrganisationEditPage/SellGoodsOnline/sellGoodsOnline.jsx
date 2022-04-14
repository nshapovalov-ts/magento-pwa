import React from 'react';

import Heading from 'components/Heading';
import {
    BUTTON_IMAGE_PATH,
    ITEM_TYPES,
    ORGANISATION_PREFERENCES_SECTIONS
} from '../../../constants';
import Item from '../Item';
import { sellGoodsOnlineData } from './sellGoodsOnlineData.js';

import useFieldState from '@magento/peregrine/lib/hooks/hook-wrappers/useInformedFieldStateWrapper';

import classes from './sellGoodsOnline.module.css';

const SellGoodsOnline = () => {
    const { value: sellGoodsValues = [] } = useFieldState(
        ORGANISATION_PREFERENCES_SECTIONS.sellGoods
    );

    const isOnlineActive = sellGoodsValues.includes('5620') || sellGoodsValues.includes('5622');

    if (!isOnlineActive) {
        return null;
    }

    return (
        <section>
            <Heading>Where do you currently sell your goods online?</Heading>
            <div className={classes.container}>
                {sellGoodsOnlineData.map(item => {
                    const imageSrc = `${BUTTON_IMAGE_PATH}${item.id}.jpg`;

                    return (
                        <Item
                            key={item.id}
                            id={item.id}
                            field={ORGANISATION_PREFERENCES_SECTIONS.sellGoodsOnline}
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

export default SellGoodsOnline;
