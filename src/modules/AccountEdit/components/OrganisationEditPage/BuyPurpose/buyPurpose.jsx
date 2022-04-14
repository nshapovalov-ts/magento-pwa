import React from 'react';

import { Message } from 'components/Field';
import Heading from 'components/Heading';
import {
    BUTTON_IMAGE_PATH,
    ITEM_TYPES,
    ORGANISATION_PREFERENCES_SECTIONS
} from '../../../constants';
import Item from '../Item';
import { buyPurposeData } from './buyPurposeData';

import useFieldState from '@magento/peregrine/lib/hooks/hook-wrappers/useInformedFieldStateWrapper';

import classes from './buyPurpose.module.css';

const BuyPurpose = () => {
    const fieldState = useFieldState(ORGANISATION_PREFERENCES_SECTIONS.buyPurpose);

    return (
        <section>
            <Heading>What is your purpose for buying on TradeSquare?</Heading>
            <Message fieldState={fieldState} />
            <div className={classes.container}>
                {buyPurposeData.map(item => {
                    const imageSrc = `${BUTTON_IMAGE_PATH}${item.id}.jpg`;

                    return (
                        <Item
                            key={item.id}
                            id={item.id}
                            field={ORGANISATION_PREFERENCES_SECTIONS.buyPurpose}
                            title={item.name}
                            imgSrc={imageSrc}
                            type={ITEM_TYPES.small}
                            required
                        />
                    );
                })}
            </div>
        </section>
    );
};

export default BuyPurpose;
