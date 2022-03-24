import React from 'react';
import { FormattedMessage } from 'react-intl';
import dompurify from 'dompurify';

import net60TermsHtml from './net60Terms.html';

import classes from './net60Terms.module.css';

const Net60Terms = () => {
    const clearHtml = dompurify.sanitize;

    return (
        <article className={classes.root}>
            <h1 className={classes.title}>
                <FormattedMessage
                    id={'net60TermsPage.title'}
                    defaultMessage={'Net 60 terms and conditions'}
                />
            </h1>
            <section
                className={classes.terms}
                dangerouslySetInnerHTML={{ __html: clearHtml(net60TermsHtml) }}
            />
        </article>
    );
};

export default Net60Terms;
