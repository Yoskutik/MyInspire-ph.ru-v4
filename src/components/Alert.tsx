import React, { CSSProperties, FC, useState } from 'react';
import styles from '@sass/components/Alert.module.scss';
import { CloseButton } from './CloseButton';
import { Container } from './Container';

interface AlertProps {
    type: 'success' | 'info' | 'error';
    expiredAt?: Date;
    cls?: string;
    style?: CSSProperties;
    onInfoClick?: () => void;
}

export const Alert: FC<AlertProps> = ({ type, expiredAt, children, cls = '', style, onInfoClick }) => {
    const [closed, setClosed] = useState(false);
    const cantShow = closed || (expiredAt && expiredAt < new Date());

    return <>
        {!cantShow && (
            <Container cls={`${styles.alert} ${styles[`alert--${type}`]} ${cls}`}>
                {children}
                <CloseButton cls={styles.close} onClick={() => setClosed(true)}/>
                {onInfoClick && (
                    <button className={styles.info} onClick={onInfoClick}>Подробнее</button>
                )}
            </Container>
        )}
    </>;
};
