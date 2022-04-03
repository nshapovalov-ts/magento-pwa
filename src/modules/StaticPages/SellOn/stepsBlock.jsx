import React from 'react';

import blockImageOne from './assets/neto_step_img_1.png';
import blockImageTwo from './assets/neto_step_img_2.png';
import blockImageThree from './assets/neto_step_img_3.png';
import blockImageFour from './assets/neto_step_img_4.png';
import zipBusinessImage from './assets/zipbiz-navy_1.png';
import classes from './stepsBlock.module.css';

const StepsBlock = () => {
    return (
        <>
            <section className={classes.stepsBlock}>
                <div className={classes.stepsBlockImage}>
                    <img src={blockImageOne} alt="Grow your sales in new markets" />
                </div>
                <div className={classes.stepsBlockInfo}>
                    <div className={classes.stepsBlockNumber}>1</div>
                    <h2>
                        Grow your sales <br />
                        in new markets
                    </h2>
                    <p>
                        Selling with TradeSquare is the easy and cost effective way to reach new
                        buyers, drive your brand and generate more income for your business
                    </p>
                </div>
            </section>
            <section className={classes.stepsBlock}>
                <div className={classes.stepsBlockImage}>
                    <img
                        src={blockImageTwo}
                        alt="Offer buyers payment terms with Zip Business Trade, on us"
                    />
                </div>
                <div className={classes.stepsBlockInfo}>
                    <div className={classes.stepsBlockNumber}>2</div>
                    <img src={zipBusinessImage} alt="zip business logo" />
                    <h2>
                        Offer buyers payment <br />
                        terms with Zip Business <br />
                        Trade, on us
                    </h2>
                    <p>
                        We cover the payment terms so buyers can order your products now, and pay
                        later
                    </p>
                </div>
            </section>
            <section className={classes.stepsBlock}>
                <div className={classes.stepsBlockImage}>
                    <img src={blockImageThree} alt="Your payments are guaranteed" />
                </div>
                <div className={classes.stepsBlockInfo}>
                    <div className={classes.stepsBlockNumber}>3</div>
                    <h2>
                        Your payments <br />
                        are guaranteed
                    </h2>
                    <p>
                        We take care of credit card and payment processing, so you get paid on time,
                        every time
                    </p>
                    <ul>
                        <li>No account management</li>
                        <li>No bad debts</li>
                        <li>No late payments</li>
                    </ul>
                </div>
            </section>
            <section className={classes.stepsBlock}>
                <div className={classes.stepsBlockImage}>
                    <img src={blockImageFour} alt="Easy and secure way for retailers" />
                </div>
                <div className={classes.stepsBlockInfo}>
                    <div className={classes.stepsBlockNumber}>4</div>
                    <h2>
                        Easy and secure way <br />
                        for retailers
                    </h2>
                    <p>The easy and secure way for retailers and businesses to buy wholesale</p>
                    <ul>
                        <li>One location to source great wholesale products, 24x7</li>
                        <li>Payment and finance options</li>
                        <li>Buyer protection guarantee</li>
                        <li>Price guarantee</li>
                    </ul>
                </div>
            </section>
        </>
    );
};

export default StepsBlock;
