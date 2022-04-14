import React from 'react';

import Heading from 'components/Heading';
import { ITEM_TYPES, ORGANISATION_PREFERENCES_SECTIONS } from '../../../constants';
import Item from '../Item';
import { frequentlyOrderData } from './frequentlyOrderData.js';

import classes from './frequentlyOrder.module.css';

const FrequentlyOrder = () => {
    return (
        <section>
            <Heading>How frequently do you order?</Heading>
            <div className={classes.container}>
                {frequentlyOrderData.map(item => {
                    return (
                        <Item
                            key={item.id}
                            id={item.id}
                            field={ORGANISATION_PREFERENCES_SECTIONS.frequentlyOrder}
                            title={item.name}
                            type={ITEM_TYPES.text}
                        />
                    );
                })}
            </div>
        </section>
    );
};

export default FrequentlyOrder;
