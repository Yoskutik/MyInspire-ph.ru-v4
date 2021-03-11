import React, { CSSProperties, FC, useMemo } from 'react';
import getConfig from 'next/config';
import { createKeywordGenerator } from '@utils';

export interface PictureProps {
    src: string;
    picCls?: string;
    imgCls?: string;
    lazy?: boolean;
    alt?: string;
    style?: CSSProperties;
    onLoad?: () => void;
    onClick?: () => void;
}

const generator = createKeywordGenerator();

export const Picture: FC<PictureProps> = ({ src, imgCls, picCls, lazy, alt: initialAlt, onLoad, onClick, style }) => {
    const alt = useMemo(() => initialAlt || generator.next().value, [src, initialAlt]);
    const { publicRuntimeConfig } = getConfig();

    return (
        <picture style={style} className={picCls}>
            {!publicRuntimeConfig.dev && <source srcSet={`${src}.webp`} type="image/webp"/>}
            <img className={imgCls} alt={alt} src={src} loading={lazy ? 'lazy' : 'eager'} onLoad={onLoad}
                 onClick={onClick} />
        </picture>
    );
};
