import React from 'react';
import { FormattedMessage } from 'react-intl';

import image1 from './assets/zip_four_easy_steps_1_png.webp';
import image2 from './assets/zip_four_easy_steps_2_png.webp';
import image3 from './assets/zip_four_easy_steps_3_png.webp';

import classes from './easySteps.module.css';

const imagesData = [
    {
        path: image1,
        text: `Apply {here} for your Zip Business Trade or Trade Plus account`
    },
    {
        path: image2,
        text: `Select your purchases on TradeSquare`
    },
    {
        path: image3,
        text: `Select the Zip option at checkout`
    }
];

const EasySteps = () => {
    const formatedMessage = message => {
        return (
            <FormattedMessage
                id={'no.id'}
                defaultMessage={message}
                values={{
                    here: (
                        <a
                            className={classes.link}
                            href="https://zip.co/au/business/trade?%24web_only=true&_branch_match_id=800950833557125779&utm_source=TradeSquare&utm_medium=marketing"
                        >
                            HERE
                        </a>
                    )
                }}
            />
        );
    };

    return (
        <section className={classes.root}>
            <h2>3 easy steps to get started</h2>
            <div className={classes.container}>
                {imagesData.map((item, index) => {
                    return (
                        <div className={classes.imageContainer} key={index}>
                            <figure key={index}>
                                <div className={classes.image}>
                                    <img src={item.path} alt={item.text} />
                                </div>
                                <figcaption className={classes.imageDescription}>
                                    {formatedMessage(item.text)}
                                </figcaption>
                            </figure>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default EasySteps;
