import React, { useState } from 'react';
import { Search as SearchIcon } from 'react-feather';
import { useIntl } from 'react-intl';
import { arrayOf, bool, func, shape, string } from 'prop-types';

import Icon from '@magento/venia-ui/lib/components/Icon';
import Button from 'components/Button';
import TextInput from 'components/TextInput';
import DropdownButton from '../DropdownButton';
import FilterList from './FilterList';

import { useStyle } from '@magento/venia-ui/lib/classify';
import setValidator from '@magento/peregrine/lib/validators/set';

import defaultClasses from './filterBlock.module.css';

const FilterBlock = props => {
    const { filterApi, filterState, group, items, name, onApply, resetFilters } = props;
    const [filteredItems, setFilteredItems] = useState(items);

    const { formatMessage } = useIntl();

    const searchIcon = <Icon src={SearchIcon} size={20} />;
    const classes = useStyle(defaultClasses, props.classes);

    const itemAriaLabel = formatMessage(
        {
            id: 'filterModal.item.ariaLabel',
            defaultMessage: 'Filter products by "{itemName}"'
        },
        {
            itemName: name
        }
    );

    const getFiltersBySearch = searchStr => {
        if (searchStr) {
            return items.filter(item => {
                const title = item.title.toLowerCase();

                return title.includes(searchStr.toLowerCase());
            });
        }

        return items;
    };

    const handleSearchChange = formData => {
        const foundFilters = getFiltersBySearch(formData.values.search || '');
        setFilteredItems(foundFilters);
    };

    const handleToggle = ({ group, item }) => {
        filterApi.toggleItem({ group, item });
    };

    const handleClear = () => {
        if (filterState) {
            filterState.forEach(item => filterApi.removeItem({ group, item }));
        }
    };

    const list = (
        <div className={classes.list}>
            <div className={classes.topRow}>
                <span className={classes.filterName}>{name}</span>
                <Button
                    variant="text"
                    classes={{ root: classes.clearButton }}
                    onClick={handleClear}
                    disabled={!filterState}
                >
                    Clear All
                </Button>
            </div>
            <div className={classes.search}>
                <TextInput field="search" placeholder={`Search for ${name}`} after={searchIcon} />
            </div>
            <FilterList
                toggleItem={handleToggle}
                filterState={filterState}
                group={group}
                items={filteredItems}
            />
        </div>
    );

    return (
        <li className={classes.root} aria-label={itemAriaLabel} data-cy="FilterBlock-root">
            <DropdownButton
                onClose={resetFilters}
                onApply={onApply}
                title={name}
                formProps={{
                    onChange: handleSearchChange
                }}
                isActive={!!filterState}
            >
                {list}
            </DropdownButton>
        </li>
    );
};

FilterBlock.propTypes = {
    classes: shape({
        header: string,
        list: string,
        name: string,
        root: string,
        trigger: string
    }),
    filterApi: shape({}).isRequired,
    filterState: setValidator,
    group: string.isRequired,
    items: arrayOf(shape({})),
    name: string.isRequired,
    onApply: func
};

export default FilterBlock;
