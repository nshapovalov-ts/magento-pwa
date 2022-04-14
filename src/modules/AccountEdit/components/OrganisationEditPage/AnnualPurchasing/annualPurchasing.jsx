import React from 'react';

import { Message } from 'components/Field';
import Heading from 'components/Heading';
import { ITEM_TYPES, ORGANISATION_PREFERENCES_SECTIONS } from '../../../constants';
import Item from '../Item';
import { annualPurchasingData } from './annualPurchasingData.js';

import useFieldState from '@magento/peregrine/lib/hooks/hook-wrappers/useInformedFieldStateWrapper';

import classes from './annualPurchasing.module.css';

const AnnualPurchasing = () => {
    const fieldState = useFieldState(ORGANISATION_PREFERENCES_SECTIONS.annualPurchasing);

    return (
        <section>
            <Heading>What is your annual purchasing spend?</Heading>
            <Message fieldState={fieldState} />
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
