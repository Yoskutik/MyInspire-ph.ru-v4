import React, { CSSProperties } from 'react';
import { SpinnerIcon } from '@components/icons';
import styles from '@sass/components/Spinner.module.scss';

interface SpinnerProps {
    className?: string;
    size?: number;
    style?: CSSProperties;
}

export const Spinner: React.FC<SpinnerProps> = ({ className, size, style }) => (
    <div className={`${styles.spinner} ${className || ''}`} style={style}>
        <SpinnerIcon size={size || 16} />
    </div>
);
