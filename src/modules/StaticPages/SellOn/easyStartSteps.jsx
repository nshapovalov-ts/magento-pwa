import React from 'react';

import image1 from './assets/neto_3_easy_img_1.png';
import image2 from './assets/neto_3_easy_img_2.png';
import image3 from './assets/neto_3_easy_img_3.png';

import classes from './easyStartSteps.module.css';

const imagesData = [
    {
        path: image1,
        text: `Apply and register\n
        your business`
    },
    {
        path: image2,
        text: `Upload and integrate\n
        your products on our\n
        platform`
    },
    {
        path: image3,
        text: `Start selling to new\n
        buyers`
    }
];

const EasyStartSteps = () => {
    return (
        <section className={classes.root}>
            <h2>
                3 easy steps to start <br />
                selling with TradeSquare
            </h2>
            <div className={classes.container}>
                {imagesData.map((item, index) => {
                    return (
                        <div className={classes.imageContainer} key={index}>
                            <figure>
                                <div className={classes.image}>
                                    <span className={classes.imageNumber}>{index + 1}</span>
                                    <img src={item.path} alt={item.text} />
                                </div>
                                <figcaption className={classes.imageDescription}>
                                    {item.text}
                                </figcaption>
                            </figure>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default EasyStartSteps;
