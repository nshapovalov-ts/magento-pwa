import React from 'react';
import { shape, string } from 'prop-types';

import Shimmer from '@magento/venia-ui/lib/components/Shimmer';
import { ContentLayout } from 'components/Layouts';

import { useStyle } from '@magento/venia-ui/lib/classify';

import defaultClasses from './contactPage.module.css';
import shimmerClasses from './contactPage.shimmer.module.css';

const ContactPageShimmer = props => {
    const { classes: propClasses } = props;
    const classes = useStyle(defaultClasses, shimmerClasses, propClasses);

    return (
        <ContentLayout>
            <div className={classes.content}>
                <div className={classes.formContainer}>
                    <div className={classes.title}>
                        <Shimmer classes={{ root_rectangle: classes.shimmer }}>&nbsp;</Shimmer>
                    </div>

                    <div className={classes.form}>
                        <div key="email">
                            <Shimmer
                                classes={{
                                    root_rectangle: classes.shimmerLabel
                                }}
                            >
                                &nbsp;
                            </Shimmer>
                            <Shimmer type="textInput" />
                        </div>
                        <div className={classes.name}>
                            <div key="name">
                                <Shimmer
                                    classes={{
                                        root_rectangle: classes.shimmerLabel
                                    }}
                                >
                                    &nbsp;
                                </Shimmer>
                                <Shimmer type="textInput" />
                            </div>
                            <div key="lastName">
                                <Shimmer
                                    classes={{
                                        root_rectangle: classes.shimmerLabel
                                    }}
                                >
                                    &nbsp;
                                </Shimmer>
                                <Shimmer type="textInput" />
                            </div>
                        </div>

                        <div key="message">
                            <Shimmer
                                classes={{
                                    root_rectangle: classes.shimmerLabel
                                }}
                            >
                                &nbsp;
                            </Shimmer>
                            <Shimmer type="textArea" />
                        </div>

                        <Shimmer type="textArea" />
                        <Shimmer type="textInput" />
                        <Shimmer type="textInput" />

                        <div className={classes.buttonsContainer}>
                            <Shimmer type="button" />
                        </div>
                    </div>
                </div>
            </div>
        </ContentLayout>
    );
};

ContactPageShimmer.propTypes = {
    classes: shape({
        root: string,
        banner: string,
        content: string,
        formContainer: string,
        title: string,
        subtitle: string,
        form: string,
        buttonsContainer: string,
        sideContent: string,
        shimmer: string,
        shimmerBanner: string,
        shimmerLabel: string,
        shimmerSideContent: string
    })
};

export default ContactPageShimmer;
