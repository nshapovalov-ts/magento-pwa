import React from 'react';

import Heading from 'components/Heading';
import {
    ITEM_TYPES,
    NETWORK_BUTTON_IMAGE_PATH,
    ORGANISATION_PREFERENCES_SECTIONS
} from '../../../constants';
import Item from '../Item';
import { networkData } from './networkData.js';

import classes from './network.module.css';

const Network = () => {
    return (
        <section>
            <Heading>Please select your Association/Network affiliations</Heading>
            <div className={classes.container}>
                {networkData.map(item => {
                    const imageSrc = `${NETWORK_BUTTON_IMAGE_PATH}${item.id}.png`;

                    return (
                        <Item
                            key={item.id}
                            id={item.id}
                            field={ORGANISATION_PREFERENCES_SECTIONS.network}
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

export default Network;
