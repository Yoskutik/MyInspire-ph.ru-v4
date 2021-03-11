import React, { FC } from 'react';
import { IconProps } from './IconProps';

export const PinterestIcon: FC<IconProps> = ({ size, height, width, cls }) => (
    <svg viewBox="0 0 112 112" width={size ?? width} height={size ?? height} className={cls}>
        <circle fill="#CB2027" cx="56" cy="56" r="56" />
        {/* eslint-disable-next-line max-len */}
        <path fill="#F1F2F2" d="M61,75c-4-0-6-2-9-4-2,10-4,19-11,24 c-2-14,3-25,5-37c-4-7,0-20,9-19c10,4-9,25,4,28 c14,3,19-24,11-32c-12-12-35-0-32,17c1,4,5,6,2,12 c-8-2-10-8-10-16c0-13,12-23,24-24c15-2,28,5,30,19 C85,60,76,76,61,75L61,75z" />
    </svg>
);
