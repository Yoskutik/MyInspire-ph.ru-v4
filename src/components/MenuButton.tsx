import React, { FC } from 'react';
import styles from '@sass/components/MenuButton.module.scss';

interface MenuButtonProps {
    onClick: () => void;
}

export const MenuButton: FC<MenuButtonProps> = ({ onClick }) => (
    <button type="button" className={styles['dropdown-button']} onClick={onClick}>
        <span />
        <span />
        <span />
    </button>
);
