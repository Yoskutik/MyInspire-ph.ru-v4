import React, {
    CSSProperties, forwardRef, useCallback, useEffect, useMemo, useRef,
} from 'react';
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
    width?: number;
    height?: number;
}

const generator = createKeywordGenerator();

export const Picture = forwardRef<HTMLImageElement, PictureProps>(({
    src, imgCls, picCls, lazy, alt: initialAlt, onLoad, onClick, style, width, height,
}, initRef) => {
    const alt = useMemo(() => initialAlt || generator.next().value, [src, initialAlt]);
    const ref = initRef || useRef<HTMLImageElement>();
    const onLoadTriggered = useRef(false);
    const { publicRuntimeConfig } = getConfig();

    const onLoadFunc = useCallback(() => {
        !onLoadTriggered.current && onLoad?.();
        onLoadTriggered.current = true;
    }, [onLoad]);

    useEffect(() => {
        (ref as any).current.querySelector('img').complete && onLoadFunc();
    }, []);

    return (
        <picture style={style} className={picCls} ref={ref}>
            {!publicRuntimeConfig.dev && <source srcSet={`${src}.webp`} type="image/webp"/>}
            <img onLoad={onLoadFunc} className={imgCls} alt={alt} src={src} loading={lazy ? 'lazy' : 'eager'}
                 ref={ref} onClick={onClick} width={width} height={height}/>
        </picture>
    );
});
