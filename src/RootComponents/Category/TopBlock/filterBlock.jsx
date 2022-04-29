import React, { memo } from 'react';
import { Search as SearchIcon } from 'react-feather';
import { useIntl } from 'react-intl';
import { arrayOf, bool, func, oneOf, shape, string } from 'prop-types';

import Icon from '@magento/venia-ui/lib/components/Icon';
import Button from 'components/Button';
import TextInput from 'components/TextInput';
import DropdownButton from '../DropdownButton';
import FilterList from '../FilterList';
import FilterPrice from './FilterPrice';

import { useStyle } from '@magento/venia-ui/lib/classify';
import setValidator from '@magento/peregrine/lib/validators/set';

import defaultClasses from './filterBlock.module.css';

const FilterBlock = memo(props => {
    const {
        filterApi,
        filterState,
        group,
        items,
        name,
        onApply,
        resetFilters,
        withSearch,
        type
    } = props;

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

    const handleClear = () => {
        if (filterState) {
            filterState.forEach(item => filterApi.removeItem({ group, item }));
        }
    };

    const handleToggle = ({ group, item }) => {
        if (type === 'radio' || type === 'slider') {
            handleClear();
        }
        filterApi.toggleItem({ group, item });
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
            {withSearch && (
                <div className={classes.search}>
                    <TextInput
                        field="search"
                        placeholder={`Search for ${name}`}
                        after={searchIcon}
                    />
                </div>
            )}
            {group === 'price' ? (
                <FilterPrice
                    toggleItem={handleToggle}
                    filterState={filterState}
                    group={group}
                    items={items}
                />
            ) : (
                <FilterList
                    toggleItem={handleToggle}
                    filterState={filterState}
                    group={group}
                    items={items}
                    isRadio={type === 'radio'}
                />
            )}
        </div>
    );

    return (
        <li className={classes.root} aria-label={itemAriaLabel} data-cy="FilterBlock-root">
            <DropdownButton
                onClose={resetFilters}
                onApply={onApply}
                buttonTitle={name}
                isActive={!!filterState}
            >
                {list}
            </DropdownButton>
        </li>
    );
});

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
    onApply: func,
    withSearch: bool,
    type: oneOf(['checkbox', 'radio', 'slider'])
};

export default FilterBlock;
