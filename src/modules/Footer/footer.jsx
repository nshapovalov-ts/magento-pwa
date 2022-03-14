import React, { Fragment } from 'react';
import { Facebook, Instagram, Twitter } from 'react-feather';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { shape, string } from 'prop-types';

import { ChevronRight as ArrowRight } from 'react-feather';
import Icon from '@magento/venia-ui/lib/components/Icon';
import Newsletter from "@magento/venia-ui/lib/components/Newsletter";
import { useFooter } from '@magento/peregrine/lib/talons/Footer/useFooter';

import { useStyle } from '@magento/venia-ui/lib/classify';
import defaultClasses from './footer.module.css';
import { DEFAULT_LINKS } from './sampleData';

const Footer = props => {
    const { links } = props;
    const classes = useStyle(defaultClasses, props.classes);
    const talonProps = useFooter();

    const { copyrightText } = talonProps;

    const linkGroupArray = Array.from(links);

    const linkGroups = linkGroupArray.map(([groupKey, linkProps], index) => {
        const linkElements = Array.from(linkProps, ([text, pathInfo], linkIndex) => {
            let path = pathInfo;
            let Component = Fragment;
            if (pathInfo && typeof pathInfo === 'object') {
                path = pathInfo.path;
                Component = pathInfo.Component;
            }

            const itemKey = `text: ${text} path:${path}`;
            const child = path ? (
                <Link className={classes.link} to={path} data-cy="Footer-link">
                    <FormattedMessage id={text} defaultMessage={text} />
                </Link>
            ) : (
                <span className={classes.label}>
                    <FormattedMessage id={text} defaultMessage={text} />
                </span>
            );

            const icon = linkIndex > 0 ?  <Icon className={classes.arrowRight} src={ArrowRight} size={16} /> : null

            return (
                <Component key={itemKey}>
                    <li className={classes.linkItem}>{icon}{child}</li>
                </Component>
            );
        });

        return (
            <ul key={groupKey} className={classes.linkGroup}>
                {linkElements}
                {index === 2 ? <ul className={classes.socialLinks}>
                        <li>
                            <Instagram size={20} />
                        </li>
                        <li>
                            <Facebook size={20} />
                        </li>
                        <li>
                            <Twitter size={20} />
                        </li>
                    </ul> : null}
            </ul>
        );
    })

    return (
        <footer className={classes.root} data-cy="Footer-root">
            <div className={classes.links}>
                {linkGroups}
                <Newsletter />
            </div>
            <div className={classes.branding}>
                <p className={classes.copyright}>{copyrightText || null}</p>
            </div>
        </footer>
    );
};

export default Footer;

Footer.defaultProps = {
    links: DEFAULT_LINKS
};

Footer.propTypes = {
    classes: shape({
        root: string
    })
};
