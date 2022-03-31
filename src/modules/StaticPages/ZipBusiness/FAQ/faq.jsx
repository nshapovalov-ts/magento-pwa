import React from 'react';

import Accordion from './accordion';

import classes from './faq.module.css';

const FAQ = () => {
    return (
        <section className={classes.root}>
            <div className={classes.container}>
                <h2>Zip Business Trade and Zip Business Trade Plus FAQs</h2>
                <Accordion />
            </div>
        </section>
    );
};

export default FAQ;
