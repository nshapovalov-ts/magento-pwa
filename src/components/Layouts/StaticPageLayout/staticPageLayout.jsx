import React from 'react';

import classes from './staticPage.module.css';

export const StaticPageLayout = ({ children }) => {
    return <article className={classes.root}>{children}</article>;
};
