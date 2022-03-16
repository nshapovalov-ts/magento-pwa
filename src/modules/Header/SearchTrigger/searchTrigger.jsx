import React from 'react';
import { Search as SearchIcon } from 'react-feather';
import { useIntl } from 'react-intl';
import { shape, string } from 'prop-types';

import { useStyle } from '@magento/venia-ui/lib/classify';
import { useSearchTrigger } from '@magento/peregrine/lib/talons/Header/useSearchTrigger';

import Icon from '@magento/venia-ui/lib/components/Icon';

import defaultClasses from './searchTrigger.module.css';

const SearchTrigger = React.forwardRef((props, ref) => {
    const { active, onClick } = props;

    const talonProps = useSearchTrigger({
        onClick
    });
    const { handleClick } = talonProps;
    const { formatMessage } = useIntl();

    const classes = useStyle(defaultClasses, props.classes);

    const searchClass = active ? classes.open : classes.root;

    const searchText = formatMessage({
        id: 'searchTrigger.search',
        defaultMessage: 'Search'
    });

    return (
        <button
            className={searchClass}
            data-cy="SearchTrigger-button"
            aria-label={searchText}
            onClick={handleClick}
            ref={ref}
        >
            <Icon src={SearchIcon} />
        </button>
    );
});

SearchTrigger.propTypes = {
    classes: shape({
        root: string,
        open: string
    })
};

export default SearchTrigger;