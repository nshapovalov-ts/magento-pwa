import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { string } from 'prop-types';

import { isAbsoluteUrl } from 'helpers/utils';

import classes from './footer.module.css';

const LinkComponent = ({ path, text }) => {
    if (!path) {
        return (
            <span className={classes.label}>
                <FormattedMessage id={text} defaultMessage={text} />
            </span>
        );
    }

    if (isAbsoluteUrl(path)) {
        return (
            <a className={classes.link} href={path} target="_blank" data-cy="Footer-link">
                {text}
            </a>
        );
    }

    return (
        <Link className={classes.link} to={path} data-cy="Footer-link">
            <FormattedMessage id={text} defaultMessage={text} />
        </Link>
    );
};

LinkComponent.propTypes = {
    path: string,
    text: string
};

export default LinkComponent;
