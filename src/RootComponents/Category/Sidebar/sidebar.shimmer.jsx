import React from 'react';
import { shape, string } from 'prop-types';

import Shimmer from '@magento/venia-ui/lib/components/Shimmer';

import { useStyle } from '@magento/venia-ui/lib/classify';

import defaultClasses from './sidebar.module.css';

const Sidebar = props => {
    const classes = useStyle(defaultClasses, props.classes);

    return (
        <aside className={classes.root} aria-live="polite" aria-busy="true">
            <Shimmer width="95%" height="70vh" style={{ marginBottom: 25 }} />
        </aside>
    );
};

Sidebar.propTypes = {
    classes: shape({
        root: string
    })
};

export default Sidebar;
