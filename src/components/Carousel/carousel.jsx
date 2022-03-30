import React from 'react';
import { default as NukaCarousel } from 'nuka-carousel';

import Button from './button';

import classes from './carousel.module.css';

const Carousel = ({ children, ...rest }) => {
    return (
        <div className={classes.container}>
            <NukaCarousel
                {...rest}
                navigation
                pagination={{ clickable: true }}
                defaultControlsConfig={{
                    pagingDotsContainerClassName: classes.dotsContainer,
                    pagingDotsClassName: classes.dots
                }}
                renderCenterRightControls={({ nextSlide }) => (
                    <Button onClick={nextSlide} position="right" />
                )}
                renderCenterLeftControls={({ previousSlide }) => (
                    <Button onClick={previousSlide} position="left" />
                )}
            >
                {children}
            </NukaCarousel>
        </div>
    );
};

export default Carousel;
