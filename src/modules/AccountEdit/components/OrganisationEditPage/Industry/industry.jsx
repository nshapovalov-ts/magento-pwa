import React from 'react';

import Heading from 'components/Heading';
import {
    INDUSTRY_BUTTON_IMAGE_PATH,
    ITEM_TYPES,
    ORGANISATION_PREFERENCES_SECTIONS
} from '../../../constants';
import Item from '../Item';
import { industryData } from './industyData.js';

import classes from './industry.module.css';

const Industry = () => {
    return (
        <section>
            <Heading>What is your main industry?</Heading>
            <div className={classes.container}>
                {industryData.map(item => {
                    const imageSrc = `${INDUSTRY_BUTTON_IMAGE_PATH}${item.id}.png`;

                    return (
                        <Item
                            key={item.id}
                            id={item.id}
                            field={ORGANISATION_PREFERENCES_SECTIONS.industry}
                            title={item.name}
                            type={ITEM_TYPES.image}
                            imgSrc={imageSrc}
                            multiple
                        />
                    );
                })}
            </div>
        </section>
    );
};

export default Industry;
