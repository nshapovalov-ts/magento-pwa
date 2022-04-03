import React, { useRef } from 'react';
import { useButton } from 'react-aria';
import classNames from 'classnames';
import { bool, oneOf, shape, string } from 'prop-types';

import Link from '@magento/venia-ui/lib/components/Link';

import { useStyle } from '@magento/venia-ui/lib/classify';

import defaultClasses from './button.module.css';

const getRootClassName = ({ classes, variant = 'text', size = 'medium', primary }) =>
    `${classes[variant]} ${classes[size + 'Size']} ${primary && classes.primary}`;

/**
 * A component for buttons.
 *
 * @typedef Button
 * @kind functional component
 *
 * @param {props} props React component props
 *
 * @returns {React.Element} A React component that displays a single button.
 */

const Button = ({
    component = 'button',
    children,
    classes: propClasses,
    variant = 'text',
    size = 'medium',
    primary,
    disabled,
    onPress,
    ...restProps
}) => {
    const buttonRef = useRef();

    const { buttonProps } = useButton(
        {
            isDisabled: disabled,
            onPress,
            ...restProps
        },
        buttonRef
    );

    const classes = useStyle(defaultClasses, propClasses);
    const rootClassName = classNames(
        classes.root,
        getRootClassName({ classes, variant, size, primary })
    );

    if (component === 'link') {
        return (
            <Link className={rootClassName} {...buttonProps} {...restProps}>
                <span className={classes.content}>{children}</span>
            </Link>
        );
    }

    return (
        <button ref={buttonRef} className={rootClassName} {...buttonProps} {...restProps}>
            <span className={classes.content}>{children}</span>
        </button>
    );
};

/**
 * Props for {@link Button}
 *
 * @typedef props
 *
 * @property {Object} classes An object containing the class names for the
 * Button component.
 * @property {string} classes.content classes for the button content
 * @property {string} classes.root classes for root container
 * @property {string} component component used for the root node
 * @property {string} variant the variant of the Button
 * @property {string} size the size of the Button
 * @property {string} type the type of the Button
 * @property {bool} disabled is the button disabled
 */
Button.propTypes = {
    classes: shape({
        content: string,
        root: string,
        contained: string,
        text: string,
        outlined: string,
        sizeSmall: string,
        sizeMedium: string,
        sizeLarge: string,
        primary: string
    }),
    component: oneOf(['button', 'link']),
    variant: oneOf(['text', 'contained', 'outlined']),
    size: oneOf(['small', 'medium', 'large']),
    primary: bool,
    disabled: bool
};

export default Button;
