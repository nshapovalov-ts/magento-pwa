import React from 'react';
import PropTypes from 'prop-types';

import { useStyle } from '@magento/venia-ui/lib/classify';

import defaultClasses from './heading.module.css';

/**
 * The Heading component shows an heading component with default font sizes.
 *
 * @param {Object} props
 * @param {Object} props.classes - CSS classes to override element styles.
 */
const Heading = ({ size = 'h2', classes = {}, children }) => {
    const classNames = useStyle(defaultClasses, classes);
    const Component = size;

    return (
        <span className={classNames.root}>
            <Component>{children}</Component>
        </span>
    );
};

export default Heading;

Heading.propTypes = {
    size: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5']),
    classes: PropTypes.shape({
        root: PropTypes.string
    }),
    children: PropTypes.node.isRequired
};
