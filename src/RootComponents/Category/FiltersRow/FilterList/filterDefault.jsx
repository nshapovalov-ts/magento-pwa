import React from 'react';
import { useIntl } from 'react-intl';
import { bool, shape, string } from 'prop-types';

import Checkbox from '@magento/venia-ui/lib/components/Checkbox';

import { useStyle } from '@magento/venia-ui/lib/classify';

import defaultClasses from './filterDefault.module.css';

const FilterDefault = props => {
    const {
        classes: propsClasses,
        isSelected,
        item,
        isRadio,
        onMouseDown,
        onKeyDown,
        ...restProps
    } = props;

    const { label, value_index } = item || {};

    const classes = useStyle(defaultClasses, propsClasses);
    const { formatMessage } = useIntl();

    const ariaLabel = !isSelected
        ? formatMessage(
              {
                  id: 'filterModal.item.applyFilter',
                  defaultMessage: 'Apply filter "{optionName}".'
              },
              {
                  optionName: label
              }
          )
        : formatMessage(
              {
                  id: 'filterModal.item.clearFilter',
                  defaultMessage: 'Remove filter "{optionName}".'
              },
              {
                  optionName: label
              }
          );

    const id = `${label}-${value_index}`;

    if (isRadio) {
        return (
            // TODO: Fix default venia radio component before use as common component, then replace this one
            // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
            <label
                className={classes.radio}
                aria-label={ariaLabel}
                aria-checked={isSelected}
                onMouseDown={onMouseDown}
                onKeyDown={onKeyDown}
            >
                <input
                    type="radio"
                    name={`${label}-${value_index}`}
                    value={value_index}
                    data-cy="FilterDefault-radio"
                    checked={isSelected}
                    onChange={onMouseDown}
                    {...restProps}
                />
                {label}
            </label>
        );
    }

    return (
        <Checkbox
            classes={classes}
            field={id}
            fieldValue={isSelected}
            label={label}
            ariaLabel={ariaLabel}
            data-cy="FilterDefault-checkbox"
            onMouseDown={onMouseDown}
            onKeyDown={onKeyDown}
            {...restProps}
        />
    );
};

export default FilterDefault;

FilterDefault.propTypes = {
    classes: shape({
        root: string,
        icon: string,
        label: string,
        checked: string
    }),
    group: string,
    isSelected: bool,
    item: shape({
        label: string.isRequired,
        value_index: string.isRequired
    }).isRequired,
    label: string,
    isRadio: bool
};
