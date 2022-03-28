import React from 'react';

import centerBanner1 from './assets/large-About_Us_01.jpg';

import classes from './aboutUsPage.module.css';

const AboutBlockOne = () => {
    return (
        <section className={classes.aboutBlockOne}>
            <div className={classes.container}>
                <div className={classes.aboutBlockText}>
                    <h2>A few words about us</h2>
                    <p>
                        TradeSquare is a fair dinkum Australian B2B trading platform for Australian
                        SMEs to source products from Australian distributors and wholesalers. We
                        have assembled an unprecedented range of items at wholesale prices and offer
                        buyers 60-days free credit - all in a single online location you can visit
                        anytime from anywhere.
                    </p>
                    <p>
                        Our founders and partners are experienced Australian entrepreneurs who
                        understand your business challenges - especially in times of a global
                        pandemic. We have lived through the hard knocks of running a business in
                        Australia and come out the other side. Now we are here to help you do the
                        same.
                    </p>
                    <p>
                        The power of our community is our mission - the platform is just an enabler.
                        Our vision is to empower Australian small businesses by enabling them to
                        transact directly through a digital platform that provides them with the
                        tools and capabilities they need to grow and be productive whilst supporting
                        the local economy.
                    </p>
                </div>
                <div className={classes.aboutBlockImage}>
                    <img src={centerBanner1} alt="We are all about you" />
                </div>
            </div>
        </section>
    );
};

export default AboutBlockOne;
