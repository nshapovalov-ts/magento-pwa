import React from 'react';

import Heading from 'components/Heading';
import {
    BUTTON_IMAGE_PATH,
    ITEM_TYPES,
    ORGANISATION_PREFERENCES_SECTIONS
} from '../../../constants';
import Item from '../Item';
import { buyPurposeData } from './buyPurposeData';

import classes from './buyPurpose.module.css';

const Lpo = () => {
    return (
        <section>
            <Heading>What is your purpose for buying on TradeSquare?</Heading>
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
                        />
                    );
                })}
            </div>
        </section>
    );
};

export default Lpo;
