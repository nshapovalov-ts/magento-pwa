import React from 'react';

import banner from './assets/neto_agha_page_banner.png';
import classes from './digitalPartner.module.css';

const DigitalPartner = () => {
    const title = 'Official digital Partner for Australian Gift & Homewares Association';

    return (
        <section className={classes.root}>
            <h2>{title}</h2>
            <div className={classes.image}>
                <img src={banner} alt={title} />
            </div>
        </section>
    );
};

export default DigitalPartner;
