import React, { Fragment, Suspense, useMemo } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { shape, string } from 'prop-types';

import Gallery, { GalleryShimmer } from '@magento/venia-ui/lib/components/Gallery';
import { Meta, Title } from '@magento/venia-ui/lib/components/Head';
import Pagination from '@magento/venia-ui/lib/components/Pagination';
import Shimmer from '@magento/venia-ui/lib/components/Shimmer';
import { ContentLayout } from 'components/Layouts';
import { FiltersSidebarShimmer } from 'modules/ProductFilters';

import { useStyle } from '@magento/venia-ui/lib/classify';
import { useSearchPage } from '@magento/peregrine/lib/talons/SearchPage/useSearchPage';

import defaultClasses from './searchPage.module.css';

const FiltersSidebar = React.lazy(() => import('modules/ProductFilters/FiltersSidebar'));
const FiltersTop = React.lazy(() => import('modules/ProductFilters/FiltersTop'));

const SearchPage = props => {
    const classes = useStyle(defaultClasses, props.classes);
    const talonProps = useSearchPage();
    const {
        availableSortMethods,
        data,
        error,
        filters,
        loading,
        pageControl,
        searchCategory,
        searchTerm,
        sortProps
    } = talonProps;

    const { formatMessage } = useIntl();

    const content = useMemo(() => {
        if (!data && loading) {
            return (
                <Fragment>
                    <section className={classes.gallery}>
                        <GalleryShimmer items={Array.from({ length: 12 }).fill(null)} />
                    </section>
                    <section className={classes.pagination} />
                </Fragment>
            );
        }

        if (!data && error) {
            return (
                <div className={classes.noResult}>
                    <FormattedMessage
                        id={'searchPage.noResult'}
                        defaultMessage={
                            'No results found. The search term may be missing or invalid.'
                        }
                    />
                </div>
            );
        }

        if (!data) {
            return null;
        }

        if (data.products.items.length === 0) {
            return (
                <div className={classes.noResult} data-cy="SearchPage-noResult">
                    <FormattedMessage
                        id={'searchPage.noResultImportant'}
                        defaultMessage={'No results found!'}
                    />
                </div>
            );
        } else {
            return (
                <Fragment>
                    <section className={classes.gallery}>
                        <Gallery items={data.products.items} />
                    </section>
                    <section className={classes.pagination}>
                        <Pagination pageControl={pageControl} />
                    </section>
                </Fragment>
            );
        }
    }, [classes.gallery, classes.noResult, classes.pagination, error, loading, data, pageControl]);

    const productsCount =
        data && data.products && data.products.total_count ? data.products.total_count : 0;

    const shouldShowTopBlock = filters && filters.length;

    const topBlock = shouldShowTopBlock ? (
        <FiltersTop
            filters={filters}
            sortProps={sortProps}
            availableSortMethods={availableSortMethods}
        />
    ) : null;

    const searchResultsHeading = loading ? (
        <Shimmer width={5} />
    ) : !data ? null : searchTerm ? (
        <FormattedMessage
            id={'searchPage.searchTerm'}
            values={{
                highlight: chunks => <span className={classes.headingHighlight}>{chunks}</span>,
                category: searchCategory,
                term: searchTerm
            }}
            defaultMessage="Showing results for <highlight>{term}</highlight>{category, select, null {} other { in <highlight>{category}</highlight>}}:"
        />
    ) : (
        <FormattedMessage
            id={'searchPage.searchTermEmpty'}
            defaultMessage={'Showing all results:'}
        />
    );

    const itemCountHeading =
        data && !loading ? (
            <span className={classes.totalPages}>
                {formatMessage(
                    {
                        id: 'searchPage.totalPages',
                        defaultMessage: '{totalCount} items'
                    },
                    { totalCount: productsCount }
                )}
            </span>
        ) : loading ? (
            <Shimmer width={5} />
        ) : null;

    const metaLabel = [searchTerm, `${STORE_NAME} Search`].filter(Boolean).join(' - ');

    return (
        <>
            <Title>{metaLabel}</Title>
            <Meta name="title" content={metaLabel} />
            <Meta name="description" content={metaLabel} />
            <ContentLayout>
                <article className={classes.root} data-cy="SearchPage-root">
                    <Suspense fallback={null}>{topBlock}</Suspense>
                    <div className={classes.contentWrapper}>
                        <div className={classes.sidebar}>
                            <Suspense fallback={<FiltersSidebarShimmer />}>
                                <FiltersSidebar filters={filters} isCategoryFilter />
                            </Suspense>
                        </div>
                        <div className={classes.searchContent}>
                            <div className={classes.heading}>
                                <div className={classes.searchInfo}>
                                    {searchResultsHeading}
                                    {itemCountHeading}
                                </div>
                            </div>
                            {content}
                        </div>
                    </div>
                </article>
            </ContentLayout>
        </>
    );
};

export default SearchPage;

SearchPage.propTypes = {
    classes: shape({
        noResult: string,
        root: string,
        totalPages: string
    })
};
