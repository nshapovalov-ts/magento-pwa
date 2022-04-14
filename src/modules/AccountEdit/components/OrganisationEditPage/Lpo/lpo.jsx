import React from 'react';

import Heading from 'components/Heading';
import TextInput from 'components/TextInput';
import { ORGANISATION_PREFERENCES_SECTIONS } from '../../../constants';

import classes from './lpo.module.css';

const Lpo = () => {
    const sectionId = ORGANISATION_PREFERENCES_SECTIONS.lpo;

    return (
        <section>
            <Heading>Store code</Heading>
            <div className={classes.container}>
                <TextInput id={sectionId} field={sectionId} placeholder="6 digits code" />
            </div>
        </section>
    );
};

export default Lpo;
