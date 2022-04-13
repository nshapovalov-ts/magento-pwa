import React from 'react';

import Heading from 'components/Heading';
import { BUTTON_IMAGE_PATH, ITEM_TYPES } from '../../../constants';
import Item from '../Item';
import { buyUsuallyData } from './buyUsuallyData.js';

import classes from './buyUsually.module.css';

const BuyUsually = () => {
    return (
        <div>
            <Heading>What categories you usually buy for? (select multiple)</Heading>
            <div className={classes.container}>
                {buyUsuallyData.map(item => {
                    const imageSrc = `${BUTTON_IMAGE_PATH}${item.id}.jpg`;

                    return (
                        <Item
                            key={item.id}
                            id={item.id}
                            field={`categories_usually_buy`}
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

export default BuyUsually;
