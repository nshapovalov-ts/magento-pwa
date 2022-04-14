import React from 'react';

import { Message } from 'components/Field';
import Heading from 'components/Heading';
import {
    BUTTON_IMAGE_PATH,
    ITEM_TYPES,
    ORGANISATION_PREFERENCES_SECTIONS
} from '../../../constants';
import Item from '../Item';
import { buyUsuallyData } from './buyUsuallyData.js';

import useFieldState from '@magento/peregrine/lib/hooks/hook-wrappers/useInformedFieldStateWrapper';

import classes from './buyUsually.module.css';

const BuyUsually = () => {
    const fieldState = useFieldState(ORGANISATION_PREFERENCES_SECTIONS.buyUsually);

    return (
        <section>
            <Heading>What categories you usually buy for? (select multiple)</Heading>
            <Message fieldState={fieldState} />
            <div className={classes.container}>
                {buyUsuallyData.map(item => {
                    const imageSrc = `${BUTTON_IMAGE_PATH}${item.id}.jpg`;

                    return (
                        <Item
                            key={item.id}
                            id={item.id}
                            field={ORGANISATION_PREFERENCES_SECTIONS.buyUsually}
                            title={item.name}
                            imgSrc={imageSrc}
                            type={ITEM_TYPES.small}
                            multiple
                            required
                        />
                    );
                })}
            </div>
        </section>
    );
};

export default BuyUsually;
