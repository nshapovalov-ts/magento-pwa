import React from 'react';

import Heading from 'components/Heading';
import { BUTTON_IMAGE_PATH, ITEM_TYPES } from '../../../constants';
import Item from '../Item';
import { buyPurposeData } from './buyPurposeData';

import classes from './buyPurpose.module.css';

const Lpo = () => {
    return (
        <div>
            <Heading>What is your purpose for buying on TradeSquare?</Heading>
            <div className={classes.container}>
                {buyPurposeData.map(item => {
                    const imageSrc = `${BUTTON_IMAGE_PATH}${item.id}.jpg`;

                    return (
                        <Item
                            key={item.id}
                            id={item.id}
                            field={`tradesquare`}
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

export default Lpo;
