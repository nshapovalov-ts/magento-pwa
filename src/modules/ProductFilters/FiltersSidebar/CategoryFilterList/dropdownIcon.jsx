import React from 'react';
import { ChevronDown, ChevronRight } from 'react-feather';
import PropTypes from 'prop-types';

import Icon from '@magento/venia-ui/lib/components/Icon';

const DropdownIcon = props => {
    const { isOpen, onClick } = props;

    return <Icon src={isOpen ? ChevronDown : ChevronRight} size={18} onClick={onClick} />;
};

export default DropdownIcon;

DropdownIcon.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired
};
