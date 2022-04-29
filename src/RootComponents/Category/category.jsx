import React, { Fragment } from 'react';
import { shape, string } from 'prop-types';

import ErrorView from '@magento/venia-ui/lib/components/ErrorView';
import { Meta } from '@magento/venia-ui/lib/components/Head';
import { ContentLayout } from 'components/Layouts';
import { GET_PAGE_SIZE } from './category.gql';
import CategoryContent from './categoryContent';

import { useStyle } from '@magento/venia-ui/lib/classify';
import { useCategory } from '@magento/peregrine/lib/talons/RootComponents/Category';

import defaultClasses from './category.module.css';

const Category = props => {
    const { uid } = props;

    const talonProps = useCategory({
        id: uid,
        queries: {
            getPageSize: GET_PAGE_SIZE
        }
    });

    const {
        error,
        metaDescription,
        loading,
        categoryData,
        pageControl,
        sortProps,
        pageSize
    } = talonProps;

    const classes = useStyle(defaultClasses, props.classes);

    if (!categoryData) {
        if (error && pageControl.currentPage === 1) {
            if (process.env.NODE_ENV !== 'production') {
                console.error(error);
            }

            return <ErrorView />;
        }
    }

    return (
        <Fragment>
            <Meta name="description" content={metaDescription} />
            <ContentLayout>
                <CategoryContent
                    categoryId={uid}
                    classes={classes}
                    data={categoryData}
                    isLoading={loading}
                    pageControl={pageControl}
                    sortProps={sortProps}
                    pageSize={pageSize}
                />
            </ContentLayout>
        </Fragment>
    );
};

Category.propTypes = {
    classes: shape({
        gallery: string,
        root: string,
        title: string
    }),
    uid: string
};

Category.defaultProps = {
    uid: 'Mg=='
};

export default Category;
