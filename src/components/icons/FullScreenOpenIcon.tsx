import React, { FC } from 'react';
import { IconProps } from './IconProps';

export const FullScreenOpenIcon: FC<IconProps> = ({ size = 16, height, width, cls = '', fill }) => (
    <svg height={size ?? height} width={size ?? width} viewBox="0 0 357 357" className={cls} fill={fill}>
        {/* eslint-disable-next-line max-len */}
        <path d="M51,230H0V357h128v-51H51V230z M0,128h51V51h77V0H0V128z M306,306h-77v51H357V230h-51V306z M230,0v51 H306v77h51V0H230z"/>
    </svg>
);
