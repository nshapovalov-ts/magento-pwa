import React from 'react';
import { bool, shape, string } from 'prop-types';

import { useStyle } from '@magento/venia-ui/lib/classify';
import { useScrollLock } from '@magento/peregrine';

import defaultClasses from '@magento/venia-ui/lib/components/Main/main.module.css';
import Footer from '../Footer';
import Header from '../Header';

const Main = props => {
    const { children, isMasked } = props;
    const classes = useStyle(defaultClasses, props.classes);

    const rootClass = isMasked ? classes.root_masked : classes.root;
    const pageClass = isMasked ? classes.page_masked : classes.page;

    useScrollLock(isMasked);

    return (
        <main className={rootClass}>
            <Header />
            <div className={pageClass}>{children}</div>
            <Footer />
        </main>
    );
};

export default Main;

Main.propTypes = {
    classes: shape({
        page: string,
        page_masked: string,
        root: string,
        root_masked: string
    }),
    isMasked: bool
};
