import React from 'react';
import { ChevronDown as ArrowDown, User as AccountIcon } from 'react-feather';
import { shape, string } from 'prop-types';

import Icon from '@magento/venia-ui/lib/components/Icon';

import { useStyle } from '@magento/venia-ui/lib/classify';

import defaultClasses from './accountChip.module.css';

/**
 * The AccountChip component shows an account icon.
 *
 * @param {Object} props
 * @param {Object} props.classes - CSS classes to override element styles.
 */
const AccountChip = props => {
    const classes = useStyle(defaultClasses, props.classes);

    return (
        <span className={classes.root}>
            <span className={classes.icon}>
                <Icon src={AccountIcon} />
            </span>
            <Icon src={ArrowDown} size={20} />
        </span>
    );
};

export default AccountChip;

AccountChip.propTypes = {
    classes: shape({
        root: string,
        text: string
    })
};
