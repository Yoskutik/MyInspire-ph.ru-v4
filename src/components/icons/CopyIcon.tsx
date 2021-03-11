import React, { FC } from 'react';
import { IconProps } from './IconProps';

export const CopyIcon: FC<IconProps> = ({ size, height, width, cls }) => (
    <svg viewBox="-40 0 512 512" width={size ?? width} height={size ?? height} className={cls}>
        {/* eslint-disable-next-line max-len */}
        <path d="m271 512h-191c-44 0-80-36-80-80v-271c0-44 36-80 80-80h191c44 0 80 36 80 80v271c0 44-36 80-80 80zm-191-391c-22 0-40 18-40 40v271c0 22 18 40 40 40h191c22 0 40-18 40-40v-271c0-22-18-40-40-40zm351 261v-302c0-44-36-80-80-80h-222c-11 0-20 9-20 20s9 20 20 20h222c22 0 40 18 40 40v302c0 11 9 20 20 20s20-9 20-20zm0 0" />
    </svg>
);
