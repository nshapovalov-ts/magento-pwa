import React from 'react';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';

import Image from '@magento/venia-ui/lib/components/Image';

import { useStyle } from '@magento/venia-ui/lib/classify';

import logo from 'public/Trade-Square-Logo-Black.png';

/**
 * A component that renders a logo in the header.
 *
 * @kind functional component
 *
 * @param {props} props React component props
 *
 * @returns {React.Element} A React component that displays a logo.
 */
const Logo = props => {
    const { height = 34, width = 100 } = props;
    const classes = useStyle({}, props.classes);
    const { formatMessage } = useIntl();

    const title = formatMessage({
        id: 'logo.title',
        defaultMessage: 'Tradesquare'
    });

    return (
        <Image
            alt={title}
            classes={{ image: classes.logo }}
            height={height}
            src={logo}
            title={title}
            width={width}
        />
    );
};

/**
 * Props for the Logo component.
 *
 * @kind props
 *
 * @property {Object} classes An object containing the class names for the Logo component.
 * @property {string} classes.logo Classes for logo
 * @property {number} [height=34] Height of the logo.
 * @property {number} [width=100] Width of the logo.
 */
Logo.propTypes = {
    classes: PropTypes.shape({
        logo: PropTypes.string
    }),
    height: PropTypes.number,
    width: PropTypes.number
};

export default Logo;
