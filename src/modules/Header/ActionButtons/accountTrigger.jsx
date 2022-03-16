import React, { Suspense } from 'react';
import { shape, string } from 'prop-types';

import AccountChip from 'components/AccountChip';
import defaultClasses from './accountTrigger.module.css';
import { useAccountTrigger } from '@magento/peregrine/lib/talons/Header/useAccountTrigger';
import { useIntl } from 'react-intl';
import { useStyle } from '@magento/venia-ui/lib/classify';

const AccountMenu = React.lazy(() => import('components/AccountMenu'));

/**
 * The AccountTrigger component is the call to action in the site header
 * that toggles the AccountMenu dropdown.
 *
 * @param {Object} props
 * @param {Object} props.classes - CSS classes to override element styles.
 */
const AccountTrigger = props => {
    const talonProps = useAccountTrigger();
    const {
        accountMenuIsOpen,
        accountMenuRef,
        accountMenuTriggerRef,
        setAccountMenuIsOpen,
        handleTriggerClick
    } = talonProps;

    const classes = useStyle(defaultClasses, props.classes);
    const rootClassName = accountMenuIsOpen ? classes.root_open : classes.root;
    const { formatMessage } = useIntl();

    return (
        <>
            <div className={rootClassName} ref={accountMenuTriggerRef}>
                <button
                    aria-label={formatMessage({
                        id: 'accountTrigger.ariaLabel',
                        defaultMessage: 'Toggle My Account Menu'
                    })}
                    className={classes.trigger}
                    onClick={handleTriggerClick}
                    data-cy="AccountTrigger-trigger"
                >
                    <AccountChip fallbackText="" shouldIndicateLoading={true} />
                </button>
                <Suspense fallback={null}>
                    <AccountMenu
                        ref={accountMenuRef}
                        accountMenuIsOpen={accountMenuIsOpen}
                        setAccountMenuIsOpen={setAccountMenuIsOpen}
                    />
                </Suspense>
            </div>
        </>
    );
};

export default AccountTrigger;

AccountTrigger.propTypes = {
    classes: shape({
        root: string,
        root_open: string,
        trigger: string
    })
};
