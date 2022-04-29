import React from 'react';
import { useIntl } from 'react-intl';
import { bool, shape, string } from 'prop-types';

import Checkbox from '@magento/venia-ui/lib/components/Checkbox';
import Radio from 'components/RadioGroup/radio';

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
            <Radio
                id={`${label}-${value_index}`}
                label={label}
                value={value_index}
                onClick={onMouseDown}
                onKeyDown={onKeyDown}
                {...restProps}
            />
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
            onClick={onMouseDown}
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
