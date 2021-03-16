import React, { FC } from 'react';
import { IconProps } from './IconProps';

export const RubbleIcon: FC<IconProps> = ({ size, height, width, cls, fill }) => (
    <svg viewBox="0 0 475 475" className={cls} width={size ?? width} fill={fill} height={size ?? height}>
        {/* eslint-disable-next-line max-len */}
        <path d="M250,269v-0c36,0,70-14,95-40c25-26,39-59,39-95c0-35-14-69-39-94 C319,15,286,1,250,0c-0,0-0,0-0,0h-98c-4,0-8,3-8,8v246H99c-4,0-8,3-8,8s3,8,8,8 h46v63H99c-4,0-8,3-8,8s3,8,8,8h46v121c0,4,3,8,8,8c4,0,8-3,8-8V346h156 c4,0,8-3,8-8s-3-8-8-8H159v-63H250z M159,15l0,0h90c67,2,119,54,119,119 c0,66-54,120-119,120h-90V15z"/>
    </svg>
);
