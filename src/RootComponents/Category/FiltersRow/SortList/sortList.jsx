import React, { memo, useCallback, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { array, arrayOf, shape, string } from 'prop-types';

import RadioGroup from '@magento/venia-ui/lib/components/RadioGroup';
import Radio from '@magento/venia-ui/lib/components/RadioGroup/radio';
import DropdownButton from '../../DropdownButton';

import classes from './sortList.module.css';

const SortList = memo(props => {
    const { availableSortMethods, sortProps } = props;
    const [currentSort, setSort] = sortProps;
    const [selected, setSelected] = useState(currentSort);
    const { formatMessage, locale } = useIntl();

    const orderSortingList = useCallback(
        list => {
            return list.sort((a, b) => {
                return a.text.localeCompare(b.text, locale, {
                    sensitivity: 'base'
                });
            });
        },
        [locale]
    );

    const sortMethodsFromConfig = availableSortMethods
        ? availableSortMethods
              .map(method => {
                  const { value, label } = method;
                  if (value !== 'price' && value !== 'position') {
                      return {
                          id: `sortItem.${value}`,
                          text: label,
                          attribute: value,
                          sortDirection: 'ASC'
                      };
                  }
              })
              .filter(method => !!method)
        : null;

    const handleApply = useCallback(() => {
        setSort(prevSort => {
            return {
                sortText: selected.text,
                sortId: selected.id,
                sortAttribute: selected.attribute,
                sortDirection: selected.sortDirection,
                sortFromSearch: prevSort.sortFromSearch
            };
        });
    }, [setSort, selected]);

    const handleReset = () => {
        setSelected(currentSort);
    };

    const sortElements = useMemo(() => {
        // should be not render item in collapsed mode.

        const defaultSortMethods = [
            {
                id: 'sortItem.relevance',
                text: formatMessage({
                    id: 'sortItem.relevance',
                    defaultMessage: 'Best Match'
                }),
                attribute: 'relevance',
                sortDirection: 'DESC'
            },
            {
                id: 'sortItem.priceDesc',
                text: formatMessage({
                    id: 'sortItem.priceDesc',
                    defaultMessage: 'Price: High to Low'
                }),
                attribute: 'price',
                sortDirection: 'DESC'
            },
            {
                id: 'sortItem.priceAsc',
                text: formatMessage({
                    id: 'sortItem.priceAsc',
                    defaultMessage: 'Price: Low to High'
                }),
                attribute: 'price',
                sortDirection: 'ASC'
            }
        ];

        // Do not display Position in Search
        if (!currentSort.sortFromSearch) {
            defaultSortMethods.push({
                id: 'sortItem.position',
                text: formatMessage({
                    id: 'sortItem.position',
                    defaultMessage: 'Position'
                }),
                attribute: 'position',
                sortDirection: 'ASC'
            });
        }

        const handleItemClick = sortItem => {
            setSelected(sortItem);
        };

        const allSortingMethods = sortMethodsFromConfig
            ? orderSortingList([sortMethodsFromConfig, defaultSortMethods].flat())
            : defaultSortMethods;

        const itemElements = Array.from(allSortingMethods, sortItem => {
            const { attribute, sortDirection } = sortItem;

            const key = `${attribute}--${sortDirection}`;

            return (
                <li key={key} className={classes.sortItem}>
                    <Radio
                        id={key}
                        label={sortItem.text}
                        value={sortItem.id}
                        onClick={() => handleItemClick(sortItem)}
                    />
                </li>
            );
        });

        return (
            <RadioGroup field="sort" initialValue={currentSort.sortId}>
                <ul className={classes.sortList}>{itemElements}</ul>
            </RadioGroup>
        );
    }, [
        currentSort.sortId,
        currentSort.sortFromSearch,
        formatMessage,
        orderSortingList,
        sortMethodsFromConfig
    ]);

    if (!availableSortMethods?.length) {
        return null;
    }

    const buttonTitle =
        formatMessage({
            id: 'productSort.sortByButton',
            defaultMessage: 'Sort by'
        }) +
        ' ' +
        currentSort.sortText;

    const modalTitle = formatMessage({
        id: 'productSort.sortByButton',
        defaultMessage: 'Sort by'
    });

    return (
        <div>
            <DropdownButton
                onClose={handleReset}
                onApply={handleApply}
                buttonTitle={buttonTitle}
                modalTitle={modalTitle}
            >
                {sortElements}
            </DropdownButton>
        </div>
    );
});

SortList.propTypes = {
    availableSortMethods: arrayOf(
        shape({
            label: string,
            value: string
        })
    ),
    sortProps: array
};

export default SortList;
