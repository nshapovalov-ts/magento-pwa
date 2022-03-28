import React from 'react';
import { shape, string } from 'prop-types';

import { useStyle } from '@magento/venia-ui/lib/classify';
import { useFooter } from '@magento/peregrine/lib/talons/Footer/useFooter';

import LinkGroups from './linkGroups';
import Newsletter from './Newsletter';

import defaultClasses from './footer.module.css';

const Footer = props => {
    const classes = useStyle(defaultClasses, props.classes);
    const talonProps = useFooter();

    const { copyrightText } = talonProps;

    return (
        <footer className={classes.root} data-cy="Footer-root">
            <div className={classes.main}>
                <LinkGroups />
                <div className={classes.subscribe}>
                    <Newsletter />
                </div>
            </div>
            <div className={classes.branding}>
                <p className={classes.copyright}>{copyrightText || null}</p>
            </div>
        </footer>
    );
};

export default Footer;

Footer.propTypes = {
    classes: shape({
        root: string
    })
};
