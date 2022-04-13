import React from 'react';

import Heading from 'components/Heading';
import { ITEM_TYPES } from '../../../constants';
import Item from '../Item';
import { purchasePrioritiesData } from './purchasePrioritiesData.js';

import classes from './purchasePriorities.module.css';

const PurchasePriorities = () => {
    return (
        <div>
            <Heading>What is your annual purchasing spend?</Heading>
            <div className={classes.container}>
                {purchasePrioritiesData.map(item => {
                    return (
                        <Item
                            key={item.id}
                            id={item.id}
                            field={`purchase_priorities`}
                            name={item.name}
                            type={ITEM_TYPES.text}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default PurchasePriorities;
