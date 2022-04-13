import React from 'react';

import Heading from 'components/Heading';
import { BUTTON_IMAGE_PATH, ITEM_TYPES } from '../../../constants';
import Item from '../Item';
import { sellGoodsData } from './sellGoodsData.js';

import classes from './sellGoods.module.css';

const SellGoods = () => {
    return (
        <div>
            <Heading>Where do you currently sell your goods?</Heading>
            <div className={classes.container}>
                {sellGoodsData.map(item => {
                    const imageSrc = `${BUTTON_IMAGE_PATH}${item.id}.jpg`;

                    return (
                        <Item
                            key={item.id}
                            id={item.id}
                            field={`sell_goods`}
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

export default SellGoods;
