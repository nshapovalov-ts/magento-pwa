import React, { Fragment } from 'react';
import { shape, string } from 'prop-types';

import { useStyle } from '@magento/venia-ui/lib/classify';
import { GET_PAGE_SIZE } from '@magento/venia-ui/lib/RootComponents/Category/category.gql';
import defaultClasses from '@magento/venia-ui/lib/RootComponents/Category/category.module.css';
import CategoryContent from '@magento/venia-ui/lib/RootComponents/Category/categoryContent';
import { useCategory } from '@magento/peregrine/lib/talons/RootComponents/Category';

import ErrorView from '@magento/venia-ui/lib/components/ErrorView';
import { Meta } from '@magento/venia-ui/lib/components/Head';
import { ContentLayout } from 'components/Layouts';

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
