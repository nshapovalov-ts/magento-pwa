import React from 'react';

import Heading from 'components/Heading';
import { ITEM_TYPES } from '../../../constants';
import Item from '../Item';
import { frequentlyOrderData } from './frequentlyOrderData.js';

import classes from './frequentlyOrder.module.css';

const FrequentlyOrder = () => {
    return (
        <div>
            <Heading>How frequently do you order?</Heading>
            <div className={classes.container}>
                {frequentlyOrderData.map(item => {
                    return (
                        <Item
                            key={item.id}
                            id={item.id}
                            field={`frequently_order`}
                            name={item.name}
                            type={ITEM_TYPES.text}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default FrequentlyOrder;
