import React from 'react';
import { ArrowLeft, ArrowRight } from 'react-feather';
import { oneOf } from 'prop-types';

import Icon from '@magento/venia-ui/lib/components/Icon';

import classes from './button.module.css';

export const Button = ({ onClick, position }) => {
    return (
        <button className={classes.button} onClick={onClick}>
            <Icon src={position === 'left' ? ArrowLeft : ArrowRight} size={24} />
        </button>
    );
};

Button.propTypes = {
    position: oneOf(['left', 'right'])
};

export default Button;
