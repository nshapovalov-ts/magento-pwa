import React from 'react';
import { ChevronRight } from 'react-feather';
import PropTypes from 'prop-types';

import Icon from '@magento/venia-ui/lib/components/Icon';

import classes from './dropdownIcon.module.css';

const DropdownIcon = props => {
    const { isOpen, onClick } = props;

    return (
        <div className={isOpen ? classes.root_active : classes.root}>
            <Icon src={ChevronRight} size={18} onClick={onClick} />
        </div>
    );
};

export default DropdownIcon;

DropdownIcon.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired
};
