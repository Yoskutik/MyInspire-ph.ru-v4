import React, { CSSProperties, FC } from 'react';
import styles from '@sass/components/Button.module.scss';
import { IconProps } from './icons/IconProps';

interface ButtonProps {
    onClick?: () => void;
    cls?: string;
    style?: CSSProperties;
    text?: string;
    icon?: FC<IconProps>;
    iconSize?: number | string;
}

export const Button: FC<ButtonProps> = ({ onClick, icon: Icon, text, cls = '', style, iconSize }) => (
    <button className={`${styles.button} ${text ? styles['button--text'] : ''} ${cls}`.trim()} onClick={onClick}
            style={style}>
        {text}
        {Icon && <Icon size={iconSize}/>}
    </button>
);
