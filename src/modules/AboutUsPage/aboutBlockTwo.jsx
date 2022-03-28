import React from 'react';

import centerBanner2 from './assets/large-About_Us_02.jpg';

import classes from './aboutUsPage.module.css';

const AboutBlockTwo = () => {
    return (
        <section className={classes.aboutBlockTwo}>
            <div className={classes.container}>
                <div className={classes.aboutBlockImage}>
                    <img src={centerBanner2} alt="Creating opportunities for wholesales" />
                </div>
                <div className={classes.aboutBlockText}>
                    <h2>
                        But don't just take our word for it - people like you helped plan
                        TradeSquare.
                    </h2>
                    <p>
                        We talked to buyers including retailers, childcare businesses, schools,
                        councils and HR managers seeking corporate gift ideas. They told us they
                        want more product inspiration and choice when sourcing direct - and that
                        they want their orders delivered on time, which is rarely possible when
                        dealing with overseas trading platforms. They also find it cumbersome
                        filling out multiple credit applications with different suppliers and
                        they’re tired of trying to predict taxes and fees on imported goods.
                    </p>
                    <p>
                        Suppliers shared their problems too. All too often they discourage new small
                        business clients because of the credit checks and paperwork process to on
                        board them. TradeSquare solves that problem by vetting buyers and
                        guaranteeing payments so Suppliers don't have to track payments and risk
                        defaulters.
                    </p>
                    <p>
                        In the end it all comes down to trust. Whether you are a buyer or a vendor
                        you can TRUST TradeSquare to take away many pain points in your business.
                        Step on up and give the New Wave of digital wholesaling a try: we will help
                        you grow your sales, save time and boost your profits. Deadset!
                    </p>
                </div>
            </div>
        </section>
    );
};

export default AboutBlockTwo;
