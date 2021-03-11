import React, { CSSProperties, FC } from 'react';
import styles from '@sass/components/Container.module.scss';

interface ContainerProps {
    cls?: string;
    style?: CSSProperties;
}

export const Container: FC<ContainerProps> = ({ cls = '', children, style }) => (
    <div className={`${styles.container} ${cls}`} style={style}>
        {children}
    </div>
);
