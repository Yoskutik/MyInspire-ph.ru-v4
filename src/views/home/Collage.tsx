import React, {
    FC, memo, useCallback, useEffect, useRef, useState,
} from 'react';
import { $$ } from '@utils';
import { Picture } from '@components';
import { ArrowIcon } from '@components/icons';
import styles from '@sass/pages/home/Collage.module.scss';

export interface CollageProps {
    isMobile: boolean;
    photos: string[];
    arrowTop: number;
    onFirstImageLoad: () => void;
    size: [number, number];
}

export const Collage: FC<CollageProps> = memo(({ isMobile, photos, arrowTop, onFirstImageLoad, size }) => {
    const [images, setImages] = useState(photos);
    const onFirstLoadDispatched = useRef(false);

    const onLoad = useCallback(() => {
        !onFirstLoadDispatched.current && onFirstImageLoad();
        onFirstLoadDispatched.current = true;
    }, []);

    useEffect(() => {
        if (!isMobile) return null;
        const interval = setInterval(() => {
            const image = $$(`.${styles.img}`).slice(-1)[0];
            image.style.opacity = '0';
            image.addEventListener('transitionend', () => {
                const firstImage = images.pop();
                images.unshift(firstImage);
                setImages([...images]);
            });
        }, 6000);
        return () => clearInterval(interval);
    }, []);

    const imgWidth = window.innerWidth;
    const imgHeight = size[1] * (window.innerWidth / size[0]);

    return (
        <div className={styles.collage}>
            {images.slice(-2).map((src, i) => (
                <Picture src={`/photos/home/${isMobile ? 'vertical' : 'horizontal'}/${src}.jpg`} imgCls={styles.img}
                         key={src} onLoad={onLoad} lazy={i === 0} width={imgWidth} height={imgHeight}/>
            ))}
            <ArrowIcon cls={styles.arrow} size={20} style={{ top: arrowTop - 30 }}/>
        </div>
    );
});
