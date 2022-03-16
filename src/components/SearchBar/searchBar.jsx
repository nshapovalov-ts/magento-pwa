import React from 'react';
import { Form } from 'informed';
import { bool, shape, string } from 'prop-types';

import { useStyle } from '@magento/venia-ui/lib/classify';
import { useWindowSize } from '@magento/peregrine/lib/hooks/useWindowSize';
import { useSearchBar } from '@magento/peregrine/lib/talons/SearchBar';

import Autocomplete from '@magento/venia-ui/lib/components/SearchBar/autocomplete';
import SearchField from './searchField';

import defaultClasses from './searchBar.module.css';

const SearchBar = React.forwardRef((props, ref) => {
    const { isOpen } = props;
    const talonProps = useSearchBar();
    const {
        containerRef,
        handleChange,
        handleFocus,
        handleSubmit,
        initialValues,
        isAutoCompleteOpen,
        setIsAutoCompleteOpen,
        valid
    } = talonProps;
    const windowSize = useWindowSize();
    const isMobile = windowSize.innerWidth < 768;

    const classes = useStyle(defaultClasses, props.classes);
    const rootClassName =
        isOpen || !isMobile ? classes.root_open : classes.root;

    return (
        <div className={rootClassName} data-cy="SearchBar-root" ref={ref}>
            <div ref={containerRef} className={classes.container}>
                <Form
                    autoComplete="off"
                    className={classes.form}
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                >
                    <div className={classes.autocomplete}>
                        <Autocomplete
                            setVisible={setIsAutoCompleteOpen}
                            valid={valid}
                            visible={isAutoCompleteOpen}
                        />
                    </div>
                    <div className={classes.search}>
                        <SearchField
                            isSearchOpen={isMobile ? isOpen : true}
                            onChange={handleChange}
                            onFocus={handleFocus}
                        />
                    </div>
                </Form>
            </div>
        </div>
    );
});

export default SearchBar;

SearchBar.propTypes = {
    classes: shape({
        autocomplete: string,
        container: string,
        form: string,
        root: string,
        root_open: string,
        search: string
    }),
    isOpen: bool
};
