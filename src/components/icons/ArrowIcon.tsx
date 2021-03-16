import React, { FC } from 'react';
import { IconProps } from './IconProps';

export const ArrowIcon: FC<IconProps> = ({ size, height, width, cls, fill, style }) => (
    <svg viewBox="0 0 256 256" className={cls} width={size ?? width} fill={fill} height={size ?? height} style={style}>
        <defs>
            <filter id="f1" x="0" y="0">
                <feGaussianBlur in="SourceGraphic" stdDeviation="15"/>
            </filter>
        </defs>
        <polygon fill="#000" filter="url(#f1)" points="226,47 128,147 30,49 0,79 128,207 256,79"/>
        <polygon points="226,49 128,147 30,49 0,79 128,207 256,79"/>
    </svg>
);
