import React, { useRef, useState } from 'react';
import {
    ChevronDown as ArrowDown,
    ChevronUp as ArrowUp,
    Search as SearchIcon
} from 'react-feather';
import { useIntl } from 'react-intl';
import { Form } from 'informed';
import { arrayOf, bool, func, shape, string } from 'prop-types';

import Icon from '@magento/venia-ui/lib/components/Icon';
import Button from 'components/Button';
import TextInput from 'components/TextInput';
import FilterList from './FilterList';

import { useStyle } from '@magento/venia-ui/lib/classify';
import { useEventListener } from '@magento/peregrine/lib/hooks/useEventListener';
import setValidator from '@magento/peregrine/lib/validators/set';

import defaultClasses from './filterBlock.module.css';

const FilterBlock = props => {
    const { filterApi, filterState, group, items, name, onApply, resetFilters } = props;
    const [isOpen, setOpen] = useState(false);
    const [filteredItems, setFilteredItems] = useState(items);
    const blockRef = useRef(null);

    const { formatMessage } = useIntl();

    const arrowIcon = <Icon src={isOpen ? ArrowUp : ArrowDown} size={16} />;
    const searchIcon = <Icon src={SearchIcon} size={20} />;
    const classes = useStyle(defaultClasses, props.classes);

    const handleClick = () => {
        setOpen(!isOpen);
    };

    const handleClickOutside = e => {
        if (isOpen && !blockRef.current.contains(e.target)) {
            filterApi.clear();
            resetFilters();
            handleClick();
        }
    };

    useEventListener(globalThis, 'mousedown', handleClickOutside);
    useEventListener(globalThis, 'keydown', handleClickOutside);

    const itemAriaLabel = formatMessage(
        {
            id: 'filterModal.item.ariaLabel',
            defaultMessage: 'Filter products by "{itemName}"'
        },
        {
            itemName: name
        }
    );

    const toggleItemOptionsAriaLabel = isOpen
        ? formatMessage(
              {
                  id: 'filterModal.item.hideOptions',
                  defaultMessage: 'Hide "{itemName}" filter item options.'
              },
              {
                  itemName: name
              }
          )
        : formatMessage(
              {
                  id: 'filterModal.item.showOptions',
                  defaultMessage: 'Show "{itemName}" filter item options.'
              },
              {
                  itemName: name
              }
          );

    const getFiltersBySearch = str => {
        if (str) {
            return items.filter(item => {
                const title = item.title.toLowerCase();

                return title.includes(str.toLowerCase());
            });
        }

        return items;
    };

    const handleChange = formData => {
        const foundFilters = getFiltersBySearch(formData.values.search || '');
        setFilteredItems(foundFilters);
    };

    const handleApply = () => {
        onApply();
        handleClick();
    };

    const list = isOpen ? (
        <Form className={classes.list} onChange={handleChange}>
            <div className={classes.topRow}>
                <span className={classes.filterName}>{name}</span>
                <Button variant="text" classes={{ root: classes.clearButton }}>
                    Clear All
                </Button>
            </div>
            <div className={classes.search}>
                <TextInput field="search" placeholder={`Search for ${name}`} after={searchIcon} />
            </div>
            <FilterList
                filterApi={filterApi}
                filterState={filterState}
                group={group}
                items={filteredItems}
                itemCountToShow={100}
            />
            <div className={classes.applyButton}>
                <Button variant="contained" onClick={handleApply}>
                    Apply
                </Button>
            </div>
        </Form>
    ) : null;

    const rootClasses = filterState ? classes.rootActive : classes.root;

    return (
        <li
            className={rootClasses}
            aria-label={itemAriaLabel}
            data-cy="FilterBlock-root"
            ref={blockRef}
        >
            <button
                className={classes.trigger}
                onClick={handleClick}
                data-cy="FilterBlock-triggerButton"
                type="button"
                aria-expanded={isOpen}
                aria-label={toggleItemOptionsAriaLabel}
            >
                <span className={classes.header}>
                    <span className={classes.name}>{name}</span>
                    {arrowIcon}
                </span>
            </button>
            {list}
        </li>
    );
};

FilterBlock.defaultProps = {
    onApply: null,
    initialOpen: false
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
    onApply: func,
    initialOpen: bool
};

export default FilterBlock;
