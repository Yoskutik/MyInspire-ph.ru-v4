import React, { forwardRef } from 'react';
import styles from '@sass/components/MenuButton.module.scss';

interface MenuButtonProps {
    onClick: () => void;
}

export const MenuButton = forwardRef<HTMLButtonElement, MenuButtonProps>(({ onClick }, ref) => (
    <button type="button" className={styles['dropdown-button']} onClick={onClick} ref={ref}>
        <span />
        <span />
        <span />
    </button>
));
