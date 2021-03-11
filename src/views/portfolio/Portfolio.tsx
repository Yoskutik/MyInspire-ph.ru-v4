import React, { FC, useState, useCallback, useMemo } from 'react';
import { $$, debounce, isElementVisible, useEventListener } from '@utils';
import { Picture } from '@components';
import styles from '@sass/pages/portfolio/Portfolio.module.scss';
import { Gallery } from './Gallery';

const Thumbnail: FC<{ imgSrc: string, onClick: () => void }> = ({ onClick, imgSrc }) => {
    const title = imgSrc.replace('.jpg', '');

    return (
        <div className={styles.thumbnail} onClick={onClick} role="button" tabIndex={0}>
            <div className={styles.thumbnail__photo}>
                <Picture alt={title} src={`/photos/portfolio/thumbnails/${imgSrc}.jpg`}/>
                <div className={styles.thumbnail__title}>
                    {title}
                </div>
            </div>
        </div>
    );
};

export interface PortfolioProps {
    isMobile: boolean;
    photos: {
        thumbnails: string[];
        gallery: string[];
    }
}

export const Portfolio: FC<PortfolioProps> = ({ isMobile, photos }) => {
    const [galleryItems, setGalleryItems] = useState<string[]>(null);
    const galleryItemsMap = useMemo(() => {
        const items: Record<string, string[]> = {};
        photos.gallery.forEach(it => {
            const key = it.split('/')[0];
            if (key in items) {
                items[key].push(it);
            } else {
                items[key] = [it];
            }
        });
        return items;
    }, []);

    const updateGalleryItems = useCallback((imgSrc: string) => {
        setGalleryItems(imgSrc ? galleryItemsMap[imgSrc.replace('.jpg', '')] : null);
    }, []);

    useEventListener(globalThis, 'scroll', debounce(() => {
        if (!isMobile) return;
        $$(`.${styles.thumbnail}`).forEach(it => {
            isElementVisible(it, 230) ? it.classList.add(styles.hover) : it.classList.remove(styles.hover);
        });
    }));

    return <>
        <div className={styles.portfolio}>
            {photos.thumbnails.map(imgSrc => (
                <Thumbnail key={imgSrc} imgSrc={imgSrc} onClick={() => updateGalleryItems(imgSrc)} />
            ))}
        </div>
        {galleryItems && (
            <div className={styles.gallery}>
                <Gallery photos={galleryItems} onClose={() => updateGalleryItems(null)}/>
            </div>
        )}
    </>;
};
