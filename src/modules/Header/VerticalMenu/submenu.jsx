import React from 'react';
import PropTypes from 'prop-types';

import SubmenuColumn from './submenuColumn';

import { useStyle } from '@magento/venia-ui/lib/classify';
import { useSubMenu } from '@magento/peregrine/lib/talons/MegaMenu/useSubMenu';

import defaultClasses from './submenu.module.css';

/**
 * The Submenu component displays submenu in mega menu
 *
 * @param {array} props.items - categories to display
 * @param {function} props.onNavigate - function called when clicking on Link
 */
const Submenu = props => {
    const {
        items,
        isFocused,
        subMenuState,
        handleCloseSubMenu,
        categoryUrlSuffix,
        onNavigate
    } = props;
    const PADDING_OFFSET = 20;
    const classes = useStyle(defaultClasses, props.classes);

    const talonProps = useSubMenu({
        isFocused,
        subMenuState,
        handleCloseSubMenu
    });

    const { isSubMenuActive } = talonProps;

    const subMenuClasses = isSubMenuActive ? classes.submenu_active : classes.submenu;

    const subMenus = items.map((category, index) => {
        const keyboardProps = index === items.length - 1 ? talonProps.keyboardProps : {};

        return (
            <SubmenuColumn
                index={index}
                keyboardProps={keyboardProps}
                key={category.uid}
                category={category}
                categoryUrlSuffix={categoryUrlSuffix}
                onNavigate={onNavigate}
                handleCloseSubMenu={handleCloseSubMenu}
            />
        );
    });

    return (
        <div className={subMenuClasses}>
            <div className={classes.submenuItems} style={{ minWidth: PADDING_OFFSET }}>
                {subMenus}
            </div>
        </div>
    );
};

export default Submenu;

Submenu.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            children: PropTypes.array.isRequired,
            uid: PropTypes.string.isRequired,
            include_in_menu: PropTypes.number.isRequired,
            isActive: PropTypes.bool.isRequired,
            name: PropTypes.string.isRequired,
            path: PropTypes.array.isRequired,
            position: PropTypes.number.isRequired,
            url_path: PropTypes.string.isRequired
        })
    ).isRequired,
    categoryUrlSuffix: PropTypes.string,
    onNavigate: PropTypes.func.isRequired,
    handleCloseSubMenu: PropTypes.func.isRequired
};
