import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown as ArrowDown, ChevronUp as ArrowUp } from 'react-feather';
import { useIntl } from 'react-intl';
import { Form } from 'informed';
import { bool, func, node, shape, string } from 'prop-types';

import Dialog from '@magento/venia-ui/lib/components/Dialog';
import Icon from '@magento/venia-ui/lib/components/Icon';
import Button from 'components/Button';

import { useStyle } from '@magento/venia-ui/lib/classify';
import { useEventListener } from '@magento/peregrine/lib/hooks/useEventListener';
import { useWindowSize } from '@magento/peregrine/lib/hooks/useWindowSize';
import { useScrollLock } from 'common/hooks/useScrollLock';

import defaultClasses from './dropdownButton.module.css';

// TODO: think about better use dialog inside dropdown component before move to common components folder
export const DropdownButton = props => {
    const {
        children,
        buttonTitle,
        modalTitle,
        onClick,
        onClose,
        onApply,
        formProps,
        isActive
    } = props;

    const classes = useStyle(defaultClasses, props.classes);

    const [isOpen, setOpen] = useState(false);
    const [leftIndent, setLeftIndent] = useState(0);

    const rootClasses = isActive ? classes.root_active : classes.root;
    const contentClasses = isOpen ? classes.content_open : classes.content;

    const blockRef = useRef(null);
    const { formatMessage } = useIntl();
    const windowSize = useWindowSize();
    const isModalDropdown = windowSize.innerWidth < 1280;

    useScrollLock(isModalDropdown && isOpen);

    const arrowIcon = <Icon src={isOpen ? ArrowUp : ArrowDown} size={16} />;

    const handleClickOutside = e => {
        if (!isModalDropdown && isOpen && !blockRef.current.contains(e.target)) {
            if (typeof onClose === 'function') {
                onClose();
            }
            setOpen(isModalDropdown && false);
        }
    };

    useEventListener(globalThis, 'mousedown', handleClickOutside);
    useEventListener(globalThis, 'keydown', handleClickOutside);

    useEffect(() => {
        // move element to the left if it goes offscreen
        if (isOpen && !isModalDropdown) {
            const EDGE_SCREEN_INDENT = 50;
            const dropdownCoord = blockRef.current.getBoundingClientRect();
            // screen size - current x position - width of block - current indent - needed width of indent from edge of screen
            const indentX =
                windowSize.innerWidth -
                dropdownCoord.x -
                dropdownCoord.width -
                Math.abs(leftIndent) -
                EDGE_SCREEN_INDENT;

            if (indentX <= 0) {
                setLeftIndent(indentX);
            } else {
                // if element fit screen reset indent
                setLeftIndent(0);
            }
        }
    }, [isOpen, isModalDropdown, windowSize, leftIndent]);

    const handleClick = () => {
        if (!isOpen) {
            setOpen(true);
        }

        if (typeof onClick === 'function') {
            onClick();
        }
    };

    const handleClose = () => {
        setOpen(false);
        if (typeof onClose === 'function') {
            onClose();
        }
    };

    const handleApply = () => {
        setOpen(false);
        if (typeof onApply === 'function') {
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
                  itemName: modalTitle || buttonTitle
              }
          )
        : formatMessage(
              {
                  id: 'category.item.showOptions',
                  defaultMessage: 'Show "{itemName}" item options.'
              },
              {
                  itemName: modalTitle || buttonTitle
              }
          );

    const confirmButtonText = formatMessage({
        id: 'dropdownButton.confirmText',
        defaultMessage: 'Apply'
    });

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
                    <span className={classes.title}>{buttonTitle}</span>
                    {arrowIcon}
                </span>
            </button>
            {isModalDropdown ? (
                <Dialog
                    isOpen={isOpen}
                    formProps={formProps}
                    title={modalTitle}
                    classes={{
                        root: classes.modalRoot,
                        root_open: classes.modalRoot_open,
                        dialog: classes.modalDialog,
                        form: classes.modalForm,
                        contents: classes.modalContent,
                        buttons: classes.modalButtons
                    }}
                    confirmTranslationId="dropdownButton.confirmText"
                    confirmText="Apply"
                    onConfirm={handleApply}
                    onCancel={handleClose}
                >
                    <div className={classes.content}>{children}</div>
                </Dialog>
            ) : (
                <div className={contentClasses} ref={blockRef} style={{ left: leftIndent }}>
                    <Form {...formProps}>{children}</Form>
                    <div className={classes.applyButton}>
                        <Button variant="contained" onClick={handleApply}>
                            {confirmButtonText}
                        </Button>
                    </div>
                </div>
            )}
        </>
    );
};

DropdownButton.propTypes = {
    children: node,
    buttonTitle: string.isRequired,
    modalTitle: string,
    onClick: func,
    onClose: func,
    onApply: func,
    formProps: shape({}),
    isActive: bool
};

export default DropdownButton;
