import React from 'react';

import { Message } from 'components/Field';
import Heading from 'components/Heading';
import {
    BUTTON_IMAGE_PATH,
    ITEM_TYPES,
    ORGANISATION_PREFERENCES_SECTIONS
} from '../../../constants';
import Item from '../Item';
import { sellGoodsData } from './sellGoodsData.js';

import useFieldState from '@magento/peregrine/lib/hooks/hook-wrappers/useInformedFieldStateWrapper';

import classes from './sellGoods.module.css';

const SellGoods = () => {
    const fieldState = useFieldState(ORGANISATION_PREFERENCES_SECTIONS.sellGoods);
    const { value: businessTypeValues = [] } = useFieldState(
        ORGANISATION_PREFERENCES_SECTIONS.businessType
    );

    const isSellGoodsActive =
        businessTypeValues.includes('5749') || businessTypeValues.includes('5750');

    if (!isSellGoodsActive) {
        return null;
    }

    return (
        <section>
            <Heading>Where do you currently sell your goods?</Heading>
            <Message fieldState={fieldState} />
            <div className={classes.container}>
                {sellGoodsData.map(item => {
                    const imageSrc = `${BUTTON_IMAGE_PATH}${item.id}.jpg`;

                    return (
                        <Item
                            key={item.id}
                            id={item.id}
                            field={ORGANISATION_PREFERENCES_SECTIONS.sellGoods}
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

export default SellGoods;
