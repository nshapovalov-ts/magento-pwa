import React, { Fragment, Suspense } from 'react';

import { Link, Route } from 'react-router-dom';
import NavTrigger from '@magento/venia-ui/lib/components/Header/navTrigger';
import SearchTrigger from './SearchTrigger';
import Logo from 'components/Logo';
import OnlineIndicator from '@magento/venia-ui/lib/components/Header/onlineIndicator';
import VerticalMenu from './VerticalMenu';
import VerticalMenuButton from './VerticalMenuButton';
import HorizontalMenu from './HorizontalMenu';
import PageLoadingIndicator from 'components/PageLoadingIndicator';
import { ActionButtons } from './ActionButtons';
import { shape, string } from 'prop-types';
import { useHeader } from '@magento/peregrine/lib/talons/Header/useHeader';
import resourceUrl from '@magento/peregrine/lib/util/makeUrl';
import { useStyle } from '@magento/venia-ui/lib/classify';

import defaultClasses from './header.module.css';

const SearchBar = React.lazy(() => import('components/SearchBar'));

const Header = props => {
    const {
        handleSearchTriggerClick,
        hasBeenOffline,
        isOnline,
        isSearchOpen,
        searchRef,
        searchTriggerRef
    } = useHeader();

    const classes = useStyle(defaultClasses, props.classes);
    const rootClass = isSearchOpen ? classes.open : classes.closed;

    const searchBarFallback = (
        <div className={classes.searchFallback} ref={searchRef}>
            <div className={classes.input}>
                <div className={classes.loader} />
            </div>
        </div>
    );
    const searchBar = (
        <Suspense fallback={searchBarFallback}>
            <Route>
                <SearchBar isOpen={isSearchOpen} ref={searchRef} />
            </Route>
        </Suspense>
    );

    return (
        <Fragment>
            <header className={rootClass} data-cy="Header-root">
                <div className={classes.toolbar}>
                    <OnlineIndicator
                        hasBeenOffline={hasBeenOffline}
                        isOnline={isOnline}
                    />
                    <Link
                        to={resourceUrl('/')}
                        className={classes.logoContainer}
                    >
                        <Logo classes={{ logo: classes.logo }} />
                    </Link>
                    <div className={classes.menuDropdown}>
                        <VerticalMenuButton />
                        <VerticalMenu />
                    </div>

                    <div className={classes.horizontalMenu}>
                        <HorizontalMenu />
                    </div>

                    <div className={classes.searchContainer}>{searchBar}</div>

                    <div className={classes.actions}>
                        <SearchTrigger
                            onClick={handleSearchTriggerClick}
                            ref={searchTriggerRef}
                        />
                        <ActionButtons />
                        <NavTrigger />
                    </div>
                </div>
                <PageLoadingIndicator absolute />
            </header>
        </Fragment>
    );
};

Header.propTypes = {
    classes: shape({
        closed: string,
        logo: string,
        open: string,
        primaryActions: string,
        secondaryActions: string,
        toolbar: string
    })
};

export default Header;
