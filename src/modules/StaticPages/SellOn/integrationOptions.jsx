import React from 'react';

import logo1 from './assets/Neto_logo_img_1.png';
import logo2 from './assets/Neto_logo_img_2.png';
import logo3 from './assets/Neto_logo_img_3.png';
import logo4 from './assets/Neto_logo_img_4.png';

import classes from './integrationOptions.module.css';

const IntegrationOptions = () => {
    return (
        <section className={classes.root}>
            <h2>Automated Integration options</h2>
            <ul>
                <li>
                    <img src={logo1} alt="" />
                </li>
                <li>
                    <img src={logo2} alt="" />
                </li>
                <li>
                    <img src={logo3} alt="" />
                </li>
                <li>
                    <img src={logo4} alt="" />
                </li>
            </ul>
        </section>
    );
};

export default IntegrationOptions;
