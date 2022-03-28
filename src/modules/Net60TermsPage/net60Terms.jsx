import React from 'react';
import { FormattedMessage } from 'react-intl';

import RichContent from '@magento/venia-ui/lib/components/RichContent';
import { StaticPageLayout } from 'components/Layouts';
import net60TermsHtml from './net60Terms.html';

import classes from './net60Terms.module.css';

const Net60Terms = () => {
    return (
        <StaticPageLayout>
            <h1 className={classes.title}>
                <FormattedMessage
                    id={'net60TermsPage.title'}
                    defaultMessage={'Net 60 terms and conditions'}
                />
            </h1>
            <RichContent classes={{ root: classes.terms }} html={net60TermsHtml} />
        </StaticPageLayout>
    );
};

export default Net60Terms;
