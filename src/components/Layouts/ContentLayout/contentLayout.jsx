import React from 'react';

import classes from './contentLayout.module.css';

const ContentLayout = ({ children }) => {
    return <div className={classes.root}>{children}</div>;
};

export default ContentLayout;
