import React from 'react';
import { FormattedMessage } from 'react-intl';

import { Title } from '@magento/venia-ui/lib/components/Head';
import RichContent from '@magento/venia-ui/lib/components/RichContent';
import { ContentLayout } from 'components/Layouts';
import net60TermsHtml from './net60Terms.html';

import classes from './net60Terms.module.css';

const Net60TermsPage = () => {
    return (
        <>
            <Title>Net 60 Terms and Conditions</Title>

            <ContentLayout>
                <h1 className={classes.title}>
                    <FormattedMessage
                        id={'net60TermsPage.title'}
                        defaultMessage={'Net 60 terms and conditions'}
                    />
                </h1>
                <RichContent classes={{ root: classes.terms }} html={net60TermsHtml} />
            </ContentLayout>
        </>
    );
};

export default Net60TermsPage;
