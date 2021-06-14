import React, { CSSProperties, FC, useCallback, useEffect, useMemo, useRef } from 'react';
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
    const ref = useRef<HTMLImageElement>();
    const onLoadTriggered = useRef(false);
    const { publicRuntimeConfig } = getConfig();

    const onLoadFunc = useCallback(() => {
        !onLoadTriggered.current && ref.current.complete && onLoad?.();
        onLoadTriggered.current = true;
    }, [onLoad]);

    useEffect(() => onLoadFunc(), []);

    return (
        <picture style={style} className={picCls}>
            {!publicRuntimeConfig.dev && <source srcSet={`${src}.webp`} type="image/webp"/>}
            <img onLoad={onLoadFunc} className={imgCls} alt={alt} src={src} loading={lazy ? 'lazy' : 'eager'}
                 ref={ref} onClick={onClick} />
        </picture>
    );
};
