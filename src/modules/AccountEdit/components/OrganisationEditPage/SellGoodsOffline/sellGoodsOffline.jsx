import React from 'react';

import Heading from 'components/Heading';
import {
    BUTTON_IMAGE_PATH,
    ITEM_TYPES,
    ORGANISATION_PREFERENCES_SECTIONS
} from '../../../constants';
import Item from '../Item';
import { sellGoodsOfflineData } from './sellGoodsOfflineData.js';

import classes from './sellGoodsOffline.module.css';

const SellGoodsOffline = () => {
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
