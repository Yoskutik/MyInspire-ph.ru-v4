import React, { FC } from 'react';
import styles from '@sass/components/CloseButton.module.scss';

interface CloseButtonProps {
    cls?: string;
    onClick: () => void;
}

export const CloseButton: FC<CloseButtonProps> = ({ cls = '', onClick }) => (
    <button className={`${styles.button} ${cls}`} onClick={onClick}>×</button>
);
