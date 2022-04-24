import React, { useRef, useState } from 'react';
import { ChevronDown as ArrowDown, ChevronUp as ArrowUp } from 'react-feather';
import { useIntl } from 'react-intl';
import { Form } from 'informed';
import { func, node, string } from 'prop-types';

import Dialog from '@magento/venia-ui/lib/components/Dialog';
import Icon from '@magento/venia-ui/lib/components/Icon';
import Button from 'components/Button';

import { useEventListener } from '@magento/peregrine/lib/hooks/useEventListener';
import { useWindowSize } from '@magento/peregrine/lib/hooks/useWindowSize';
import { useScrollLock } from 'common/hooks/useScrollLock';

import classes from './dropdownButton.module.css';

export const DropdownButton = props => {
    const { children, title, onClick, onClose, onApply, formProps, isActive } = props;

    const [isOpen, setOpen] = useState(false);

    const rootClasses = isActive ? classes.root_active : classes.root;

    const blockRef = useRef(null);
    const { formatMessage } = useIntl();
    const windowSize = useWindowSize();
    const isModalDropdown = windowSize.innerWidth < 1280;
    useScrollLock(isModalDropdown && isOpen);

    const arrowIcon = <Icon src={isOpen ? ArrowUp : ArrowDown} size={16} />;

    const handleClickOutside = e => {
        if (!isModalDropdown && isOpen && !blockRef.current.contains(e.target)) {
            if (onClose) {
                onClose();
            }
            setOpen(isModalDropdown && !isOpen);
        }
    };

    useEventListener(globalThis, 'mousedown', handleClickOutside);
    useEventListener(globalThis, 'keydown', handleClickOutside);

    const handleClick = e => {
        // TODO: check that the parameters being opened are in the viewport, if not, then move inside it
        // e.target.getClientRects()[0];
        setOpen(!isOpen);
        if (onClick) {
            onClick();
        }
    };

    const handleClose = () => {
        setOpen(false);
        if (onClose) {
            onClose();
        }
    };

    const handleApply = () => {
        setOpen(false);
        if (onApply) {
            onApply();
        }
    };

    const toggleOptionsAriaLabel = isOpen
        ? formatMessage(
              {
                  id: 'category.item.hideOptions',
                  defaultMessage: 'Hide "{itemName}" item options.'
              },
              {
                  itemName: title
              }
          )
        : formatMessage(
              {
                  id: 'category.item.showOptions',
                  defaultMessage: 'Show "{itemName}" item options.'
              },
              {
                  itemName: title
              }
          );

    return (
        <>
            <button
                className={rootClasses}
                onClick={handleClick}
                data-cy="DropdownButton-button"
                type="button"
                aria-expanded={isOpen}
                aria-label={toggleOptionsAriaLabel}
            >
                <span className={classes.header}>
                    <span className={classes.title}>{title}</span>
                    {arrowIcon}
                </span>
            </button>
            {isModalDropdown ? (
                <Dialog
                    isOpen={isOpen}
                    formProps={formProps}
                    classes={{
                        root: classes.modalRoot,
                        root_open: classes.modalRoot_open,
                        dialog: classes.modalDialog,
                        form: classes.modalForm,
                        contents: classes.modalContent,
                        buttons: classes.modalButtons
                    }}
                    onConfirm={handleApply}
                    onCancel={handleClose}
                >
                    <div className={classes.content}>{children}</div>
                </Dialog>
            ) : (
                isOpen && (
                    <div className={classes.content} ref={blockRef}>
                        <Form {...formProps}>{children}</Form>
                        <div className={classes.applyButton}>
                            <Button variant="contained" onClick={handleApply}>
                                Apply
                            </Button>
                        </div>
                    </div>
                )
            )}
        </>
    );
};

DropdownButton.propTypes = {
    filters: arrayOf(
        shape({
            attribute_code: string,
            items: array
        })
    ),
    availableSortMethods: arrayOf(
        shape({
            label: string,
            value: string
        })
    ),
    sortProps: array,
    shouldShowSortButtons: bool,
    shouldShowSortShimmer: bool,
    shouldShowFilterButtons: bool,
    shouldShowFilterShimmer: bool
};

export default DropdownButton;
