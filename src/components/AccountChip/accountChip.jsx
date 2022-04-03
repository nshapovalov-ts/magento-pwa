import React from 'react';
import { ChevronDown as ArrowDown, User as AccountIcon } from 'react-feather';
import { shape, string } from 'prop-types';

import Icon from '@magento/venia-ui/lib/components/Icon';

import { useStyle } from '@magento/venia-ui/lib/classify';

import defaultClasses from './accountChip.module.css';

/**
 * The AccountChip component shows an icon next to some text.
 * Sometimes the text is static, sometimes it is dynamic based on the user's name,
 * and it can also be a loading icon to indicate that we're fetching the user's name.
 *
 * @param {Object} props
 * @param {Object} props.classes - CSS classes to override element styles.
 * @param {String} props.fallbackText - The text to display when the user is not signed in
 *  or when we're loading details but don't want to show a loading icon.
 * @param {Boolean} props.shouldIndicateLoading - Whether we should show a loading icon or
 *  not when the user is signed in but we don't have their details (name) yet.
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
        loader: string,
        text: string
    })
};
