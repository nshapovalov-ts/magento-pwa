import React from 'react';

import Heading from 'components/Heading';
import { BUTTON_IMAGE_PATH, ITEM_TYPES } from '../../../constants';
import Item from '../Item';
import { sellGoodsOnlineData } from './sellGoodsOnlineData.js';

import classes from './sellGoodsOnline.module.css';

const SellGoodsOnline = () => {
    return (
        <div>
            <Heading>Where do you currently sell your goods online?</Heading>
            <div className={classes.container}>
                {sellGoodsOnlineData.map(item => {
                    const imageSrc = `${BUTTON_IMAGE_PATH}${item.id}.jpg`;

                    return (
                        <Item
                            key={item.id}
                            id={item.id}
                            field={`currently_goods_online`}
                            name={item.name}
                            imgSrc={imageSrc}
                            type={ITEM_TYPES.small}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default SellGoodsOnline;
