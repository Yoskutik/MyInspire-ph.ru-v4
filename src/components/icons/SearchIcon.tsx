import React, { FC } from 'react';
import { IconProps } from './IconProps';

export const SearchIcon: FC<IconProps> = ({ size = 16, height, width, cls, fill = '#C8C8C8' }) => (
    <svg viewBox="0 0 57 57" width={size ?? width} height={size ?? height} className={cls}>
        {/* eslint-disable-next-line max-len */}
        <path fill={fill} d="M55,52L42,38c3-4,5-9,5-15c0-13-10-23-23-23s-23,10-23,23 s10,23,23,23c5,0,9-1,13-4l14,14c1,1,1,1,2,1 c1,0,2-0,2-1C56,55,56,53,55,52z M24,6c9,0,17,8,17,17s-8,17-17,17 s-17-8-17-17S14,6,24,6z"/>
    </svg>
);
