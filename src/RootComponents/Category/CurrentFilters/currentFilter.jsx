import React, { useCallback } from 'react';
import { X as Remove } from 'react-feather';
import { useIntl } from 'react-intl';
import { func, shape, string } from 'prop-types';

import CurrencySymbol from '@magento/venia-ui/lib/components/CurrencySymbol';
import Icon from '@magento/venia-ui/lib/components/Icon';
import Trigger from '@magento/venia-ui/lib/components/Trigger';
import { getFilterLabelText } from '../helpers';

import { useStyle } from '@magento/venia-ui/lib/classify';
import { useCurrencySwitcher } from '@magento/peregrine/lib/talons/Header/useCurrencySwitcher';

import defaultClasses from './currentFilter.module.css';

const CurrentFilter = props => {
    const { group, groupName, item, removeItem, onRemove } = props;
    const classes = useStyle(defaultClasses, props.classes);
    const { formatMessage } = useIntl();
    const { currentCurrencyCode } = useCurrencySwitcher();

    const labelValue = getFilterLabelText({
        defaultTitle: item.title
    });

    const handleClick = useCallback(() => {
        removeItem({ group, item });
        if (typeof onRemove === 'function') {
            onRemove(group, item);
        }
    }, [group, item, removeItem, onRemove]);

    const ariaLabel = formatMessage(
        {
            id: 'filterModal.action.clearFilterItem.ariaLabel',
            defaultMessage: 'Clear filter "{name}"'
        },
        {
            name: `${groupName} ${labelValue}`
        }
    );

    const filterTitle =
        group === 'price' ? (
            <>
                {groupName}: <CurrencySymbol currencyCode={currentCurrencyCode} />
                {labelValue}
            </>
        ) : (
            `${groupName}: ${labelValue}`
        );

    return (
        <span className={classes.root} data-cy="CurrentFilter-root">
            <span className={classes.text}>{filterTitle}</span>
            <Trigger action={handleClick} ariaLabel={ariaLabel} data-cy="CurrentFilter-trigger">
                <Icon size={20} src={Remove} />
            </Trigger>
        </span>
    );
};

export default CurrentFilter;

CurrentFilter.defaultProps = {
    onRemove: null
};

CurrentFilter.propTypes = {
    classes: shape({
        root: string
    }),
    groupName: string,
    onRemove: func
};
