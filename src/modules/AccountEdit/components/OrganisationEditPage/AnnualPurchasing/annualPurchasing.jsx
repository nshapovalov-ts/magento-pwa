import React from 'react';

import Heading from 'components/Heading';
import { ITEM_TYPES } from '../../../constants';
import Item from '../Item';
import { annualPurchasingData } from './annualPurchasingData.js';

import classes from './annualPurchasing.module.css';

const AnnualPurchasing = () => {
    return (
        <div>
            <Heading>What is your annual purchasing spend?</Heading>
            <div className={classes.container}>
                {annualPurchasingData.map(item => {
                    return (
                        <Item
                            key={item.id}
                            id={item.id}
                            field={`annual_purchasing_spend`}
                            name={item.name}
                            type={ITEM_TYPES.text}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default AnnualPurchasing;
