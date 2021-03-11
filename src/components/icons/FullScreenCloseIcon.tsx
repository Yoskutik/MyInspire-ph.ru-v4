import React, { FC } from 'react';
import { IconProps } from './IconProps';

export const FullScreenCloseIcon: FC<IconProps> = ({ size = 16, height, width, cls = '', fill }) => (
    <svg height={size ?? height} width={size ?? width} viewBox="0 0 357 357" className={cls} fill={fill}>
        {/* eslint-disable-next-line max-len */}
        <path d="M0,281h77V357h51V230H0V281z M77,77H0v51h128V0h-51V77z M230,357h51v-77H357v-51H230V357z M281,77V0h-51v128H357v-51H281z"/>
    </svg>
);
