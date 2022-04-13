import React from 'react';

import Heading from 'components/Heading';
import TextInput from 'components/TextInput';

import classes from './lpo.module.css';

const Lpo = () => {
    return (
        <div>
            <Heading>Store code</Heading>
            <div className={classes.container}>
                <TextInput id="lpo_code" field="lpo_code" placeholder="6 digits code" />
            </div>
        </div>
    );
};

export default Lpo;
