import React from 'react';

import bottomImage1 from './assets/bottom-img-1.png';
import bottomImage2 from './assets/bottom-img-2.png';
import bottomImage3 from './assets/bottom-img-3.png';
import bottomImage4 from './assets/bottom-img-4.png';
import classes from './bottomBlock.module.css';

const imagesData = [
    {
        path: bottomImage1,
        text: 'Community obsessed'
    },
    {
        path: bottomImage2,
        text: 'With soul'
    },
    {
        path: bottomImage3,
        text: 'Courage to spark change'
    },
    {
        path: bottomImage4,
        text: 'Play as a team'
    }
];

const BottomBlock = () => {
    return (
        <section className={classes.root}>
            <h2 className={classes.title}>Our values</h2>
            <div className={classes.imagesContainer}>
                {imagesData.map((image, index) => {
                    return (
                        <figure key={index}>
                            <img src={image.path} className={classes.image} alt={image.text} />
                            <figcaption className={classes.imageDescription}>
                                {image.text}
                            </figcaption>
                        </figure>
                    );
                })}
            </div>
        </section>
    );
};

export default BottomBlock;
