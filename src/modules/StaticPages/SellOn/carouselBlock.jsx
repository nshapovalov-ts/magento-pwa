import React from 'react';

import Carousel from 'components/Carousel';
import slide1 from './assets/neto_what_our_seller_img_1.jpg';
import slide2 from './assets/neto_what_our_seller_img_2.jpg';
import slide3 from './assets/neto_what_our_seller_img_3.jpg';
import slide4 from './assets/neto_what_our_seller_img_4.jpg';

import classes from './carouselBlock.module.css';

const CarouselBlock = () => {
    return (
        <section className={classes.carouselContainer}>
            <h2>What our Suppliers have to say</h2>
            <Carousel slidesToShow={2} wrapAround autoplay autoplayInterval={5000}>
                <div className={classes.slide}>
                    <img src={slide1} alt="" />
                </div>
                <div className={classes.slide}>
                    <img src={slide2} alt="" />
                </div>
                <div className={classes.slide}>
                    <img src={slide3} alt="" />
                </div>
                <div className={classes.slide}>
                    <img src={slide4} alt="" />
                </div>
            </Carousel>
        </section>
    );
};

export default CarouselBlock;
