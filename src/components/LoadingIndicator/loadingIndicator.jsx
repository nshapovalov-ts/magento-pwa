import React from 'react';

import { useStyle } from '@magento/venia-ui/lib/classify';

import defaultClasses from './indicator.module.css';

const TradesquareLoadingIndicator = props => {
    const classes = useStyle(defaultClasses, props.classes);

    return (
        <figure className={classes.customIndicator}>
            {[...Array(12)].map((_, index) => {
                return <div key={index} />;
            })}
        </figure>
    );
};

export default TradesquareLoadingIndicator;
