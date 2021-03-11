import React from 'react';
import { IconProps } from './IconProps';

export const SpinnerIcon: React.FC<IconProps> = props => (
    <svg width={props.size} height={props.size} viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="0" fill="none" stroke="#2626CC" strokeWidth="2">
            <animate attributeName="r" repeatCount="indefinite" dur="1s" values="0;40" keyTimes="0;1"
                     keySplines="0 0.2 0.8 1" calcMode="spline" begin="-0.5s" />
            <animate attributeName="opacity" repeatCount="indefinite" dur="1s" values="1;0" keyTimes="0;1"
                     keySplines="0.2 0 0.8 1" calcMode="spline" begin="-0.5s" />
        </circle>
        <circle cx="50" cy="50" r="0" fill="none" stroke="#E0E0E0" strokeWidth="2">
            <animate attributeName="r" repeatCount="indefinite" dur="1s" values="0;40" keyTimes="0;1"
                     keySplines="0 0.2 0.8 1" calcMode="spline" />
            <animate attributeName="opacity" repeatCount="indefinite" dur="1s" values="1;0" keyTimes="0;1"
                     keySplines="0.2 0 0.8 1" calcMode="spline" />
        </circle>
    </svg>
);
