import React from 'react';

import Heading from 'components/Heading';
import { BUTTON_IMAGE_PATH, ITEM_TYPES } from '../../../constants';
import Item from '../Item';
import { businessTypes } from './businessTypeData';

import classes from './businessType.module.css';

const BusinessType = () => {
    return (
        <div>
            <Heading>Which best describes your organisation?</Heading>
            <div className={classes.container}>
                {businessTypes.map(item => {
                    const imageSrc = `${BUTTON_IMAGE_PATH}${item.id}.jpg`;

                    return (
                        <Item
                            key={`business_type-${item.id}`}
                            id={item.id}
                            field={`business_type`}
                            name={item.name}
                            imgSrc={imageSrc}
                            type={ITEM_TYPES.big}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default BusinessType;
