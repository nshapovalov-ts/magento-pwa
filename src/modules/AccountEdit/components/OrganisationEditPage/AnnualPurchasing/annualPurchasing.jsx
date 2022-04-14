import React from 'react';

import Heading from 'components/Heading';
import { ITEM_TYPES, ORGANISATION_PREFERENCES_SECTIONS } from '../../../constants';
import Item from '../Item';
import { annualPurchasingData } from './annualPurchasingData.js';

import classes from './annualPurchasing.module.css';

const AnnualPurchasing = () => {
    return (
        <section>
            <Heading>What is your annual purchasing spend?</Heading>
            <div className={classes.container}>
                {annualPurchasingData.map(item => {
                    return (
                        <Item
                            key={item.id}
                            id={item.id}
                            field={ORGANISATION_PREFERENCES_SECTIONS.annualPurchasing}
                            title={item.name}
                            type={ITEM_TYPES.text}
                        />
                    );
                })}
            </div>
        </section>
    );
};

export default AnnualPurchasing;
