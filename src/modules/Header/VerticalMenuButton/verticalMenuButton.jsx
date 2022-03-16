import React from 'react';
import { ChevronDown as ArrowDown } from 'react-feather';
import PropTypes from 'prop-types';

import { useStyle } from '@magento/venia-ui/lib/classify';

import Button from '@magento/venia-ui/lib/components/Button';
import Icon from '@magento/venia-ui/lib/components/Icon';

import defaultClasses from './verticalMenuButton.module.css';

/**
 * The VerticalMenu trigger
 */
const VerticalMenuButton = props => {
    const classes = useStyle(defaultClasses, props.classes);

    return (
        <Button className={classes.root}>
            <span className={classes.title}>All categories</span>
            <Icon className={classes.arrowDown} src={ArrowDown} size={16} />
        </Button>
    );
};

VerticalMenuButton.propTypes = {
    classes: PropTypes.shape({
        root: PropTypes.string,
        title: PropTypes.string,
        arrowDown: PropTypes.string
    })
};

export default VerticalMenuButton;
