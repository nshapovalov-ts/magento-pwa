import React from 'react';
import { FormattedMessage } from 'react-intl';

import { Accordion as DefaultAccordion, Section } from '@magento/venia-ui/lib/components/Accordion';
import { FAQ_DATA } from './faqData.js';

import classes from './accordion.module.css';

const Accordion = () => {
    return (
        <div className={classes.root}>
            <DefaultAccordion canOpenMultiple={false}>
                {FAQ_DATA.map((item, index) => {
                    return (
                        <Section
                            key={item.title}
                            classes={{
                                root: classes.accordionSection,
                                contents_container: classes.contentsContainer,
                                contents_container_closed: classes.contentsContainerClosed,
                                title_wrapper: classes.titleWrapper,
                                title: classes.title
                            }}
                            id={index + 1}
                            title={item.title}
                        >
                            <div className={classes.content}>
                                <FormattedContent text={item.text} />
                            </div>
                        </Section>
                    );
                })}
            </DefaultAccordion>
        </div>
    );
};

const FormattedContent = ({ text }) => {
    return (
        <FormattedMessage
            id={'no.id'}
            defaultMessage={text}
            values={{
                p: str => <p>{str}</p>,
                conditions: (
                    <ul>
                        <li>To have an active ABN or ACN</li>
                        <li>6+ months in business</li>
                        <li>More than $5,000 in monthly sales</li>
                    </ul>
                )
            }}
        />
    );
};

export default Accordion;
