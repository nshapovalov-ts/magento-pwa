import React from 'react';

import Heading from 'components/Heading';
import { ITEM_TYPES, ORGANISATION_PREFERENCES_SECTIONS } from '../../../constants';
import Item from '../Item';
import { purchasePrioritiesData } from './purchasePrioritiesData.js';

import classes from './purchasePriorities.module.css';

const PurchasePriorities = () => {
    return (
        <section>
            <Heading>What is your annual purchasing spend?</Heading>
            <div className={classes.container}>
                {purchasePrioritiesData.map(item => {
                    return (
                        <Item
                            key={item.id}
                            id={item.id}
                            field={ORGANISATION_PREFERENCES_SECTIONS.purchasePriorities}
                            title={item.name}
                            type={ITEM_TYPES.text}
                        />
                    );
                })}
            </div>
        </section>
    );
};

export default PurchasePriorities;
