import React, { FC, memo, useEffect, useState } from 'react';
import { $$ } from '@utils';
import { Picture } from '@components';
import { ArrowIcon } from '@components/icons';
import styles from '@sass/pages/home/Collage.module.scss';

export interface CollageProps {
    isMobile: boolean;
    photos: {
        vertical: string[];
        horizontal: string[];
    };
    arrowTop: number;
}

export const Collage: FC<CollageProps> = memo(({ isMobile, photos, arrowTop }) => {
    const [images, setImages] = useState(photos[isMobile ? 'vertical' : 'horizontal']);

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

    return (
        <div className={styles.collage}>
            {images.slice(-2).map((src, i) => (
                <Picture src={`/photos/home/${isMobile ? 'vertical' : 'horizontal'}/${src}.jpg`} imgCls={styles.img}
                         key={src} onLoad={() => window.dispatchEvent(new Event('resize'))} lazy={i === 0}/>
            ))}
            <ArrowIcon cls={styles.arrow} size={20} style={{ top: arrowTop - 30 }}/>
        </div>
    );
});
