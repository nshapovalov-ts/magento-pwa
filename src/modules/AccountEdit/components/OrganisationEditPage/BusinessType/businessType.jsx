import React from 'react';

import { Message } from 'components/Field';
import Heading from 'components/Heading';
import {
    BUTTON_IMAGE_PATH,
    ITEM_TYPES,
    ORGANISATION_PREFERENCES_SECTIONS
} from '../../../constants';
import Item from '../Item';
import { businessTypes } from './businessTypeData';

import useFieldState from '@magento/peregrine/lib/hooks/hook-wrappers/useInformedFieldStateWrapper';

import classes from './businessType.module.css';

const BusinessType = () => {
    const fieldState = useFieldState(ORGANISATION_PREFERENCES_SECTIONS.businessType);

    return (
        <section>
            <Heading>Which best describes your organisation?</Heading>
            <Message fieldState={fieldState} />
            <div className={classes.container}>
                {businessTypes.map(item => {
                    const imageSrc = `${BUTTON_IMAGE_PATH}${item.id}.jpg`;

                    return (
                        <Item
                            key={`business_type-${item.id}`}
                            id={item.id}
                            field={ORGANISATION_PREFERENCES_SECTIONS.businessType}
                            title={item.name}
                            imgSrc={imageSrc}
                            type={ITEM_TYPES.big}
                            multiple
                            required
                        />
                    );
                })}
            </div>
        </section>
    );
};

export default BusinessType;
