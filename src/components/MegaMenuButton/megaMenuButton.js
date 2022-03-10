import React from 'react';
import PropTypes from 'prop-types';

import Button from '@magento/venia-ui/lib/components/Button';
import { ChevronDown as ArrowDown } from 'react-feather';
import Icon from '@magento/venia-ui/lib/components/Icon';
import { useStyle } from '@magento/venia-ui/lib/classify';

import defaultClasses from './megaMenuButton.module.css';

/**
 * The MegaMenu trigger
 */
const MegaMenuButton = props => {
    const classes = useStyle(defaultClasses, props.classes);

    return (
        <Button className={classes.root}>
            <span className={classes.title}>All categories</span>
            <Icon className={classes.arrowDown} src={ArrowDown} size={16} />
        </Button>
    );
};

MegaMenuButton.propTypes = {
    classes: PropTypes.shape({
        root: PropTypes.string,
        title: PropTypes.string,
        arrowDown: PropTypes.string
    })
};

export default MegaMenuButton;
