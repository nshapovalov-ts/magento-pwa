import React, { Fragment, Suspense } from 'react';
import { shape, string } from 'prop-types';
import { Link, Route } from 'react-router-dom';

import CartTrigger from '@magento/venia-ui/lib/components/Header/cartTrigger';
import NavTrigger from '@magento/venia-ui/lib/components/Header/navTrigger';
import SearchTrigger from './searchTrigger';
import Logo from '../../components/Logo';
import OnlineIndicator from '@magento/venia-ui/lib/components/Header/onlineIndicator';
import VerticalMenu from '../../components/VerticalMenu';
import VerticalMenuButton from '../../components/VerticalMenuButton';
import HorizontalMenu from '../../components/HorizontalMenu';
import PageLoadingIndicator from '../../components/PageLoadingIndicator';
import { AccountButtons } from './AccountButtons';

import { useHeader } from '@magento/peregrine/lib/talons/Header/useHeader';
import resourceUrl from '@magento/peregrine/lib/util/makeUrl';
import { useStyle } from '@magento/venia-ui/lib/classify';

import defaultClasses from './header.module.css';

const SearchBar = React.lazy(() => import('../../components/SearchBar'));

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
                    <div className={classes.primaryActions} />
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

                    <div className={classes.secondaryActions}>
                        <SearchTrigger
                            onClick={handleSearchTriggerClick}
                            ref={searchTriggerRef}
                        />
                        <CartTrigger />
                        <AccountButtons />
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
