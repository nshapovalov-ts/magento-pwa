import React, { Fragment } from 'react';
import { ChevronRight as ArrowRight, Facebook, Instagram, Twitter } from 'react-feather';

import Icon from '@magento/venia-ui/lib/components/Icon';
import Link from './link';
import { DEFAULT_LINKS } from './linksGroupsData';

import classes from './footer.module.css';

const LinkGroups = () => {
    const linkGroupArray = Array.from(DEFAULT_LINKS);

    return (
        <div className={classes.links}>
            {linkGroupArray.map(([groupKey, linkProps], index) => {
                const linkElements = Array.from(linkProps, ([text, pathInfo], linkIndex) => {
                    let path = pathInfo;
                    let Component = Fragment;
                    if (pathInfo && typeof pathInfo === 'object') {
                        path = pathInfo.path;
                        Component = pathInfo.Component;
                    }

                    const itemKey = `text: ${text} path:${path}`;

                    const icon =
                        linkIndex > 0 ? (
                            <Icon className={classes.arrowRight} src={ArrowRight} size={16} />
                        ) : null;

                    return (
                        <Component key={itemKey}>
                            <li className={classes.linkItem}>
                                {icon}
                                <Link path={path} text={text} />
                            </li>
                        </Component>
                    );
                });

                return (
                    <ul key={groupKey} className={classes.linkGroup}>
                        {linkElements}
                        {index === 2 ? (
                            <li>
                                <ul className={classes.socialLinks}>
                                    <li>
                                        <Instagram size={20} />
                                    </li>
                                    <li>
                                        <Facebook size={20} />
                                    </li>
                                    <li>
                                        <Twitter size={20} />
                                    </li>
                                </ul>
                            </li>
                        ) : null}
                    </ul>
                );
            })}
        </div>
    );
};

export default LinkGroups;
