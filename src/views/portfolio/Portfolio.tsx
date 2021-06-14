import React, {
    FC, useState, useCallback, useMemo, useContext, useRef,
} from 'react';
import { $$, debounce, isElementVisible, useEventListener } from '@utils';
import { MainLayoutContext, Picture } from '@components';
import styles from '@sass/pages/portfolio/Portfolio.module.scss';
import { Gallery } from './Gallery';

interface ThumbnailProps {
    imgSrc: string;
    onClick: () => void;
    onLoad: () => void;
}

const Thumbnail: FC<ThumbnailProps> = ({ onClick, imgSrc, onLoad }) => {
    const title = imgSrc.replace('.jpg', '');

    return (
        <div className={styles.thumbnail} onClick={onClick} role="button" tabIndex={0}>
            <div className={styles.thumbnail__photo}>
                <Picture alt={title} src={`/photos/portfolio/thumbnails/${imgSrc}.jpg`} onLoad={onLoad}/>
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
    const [galleryItems, setGalleryItems] = useState<string[]>();
    const amountOfLoadedImages = useRef(0);
    const { setSpinnerVisible } = useContext(MainLayoutContext);
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

    const onThumbnailLoad = useCallback(() => {
        amountOfLoadedImages.current++;
        if (amountOfLoadedImages.current === photos.thumbnails.length) setSpinnerVisible(false);
    }, []);

    return <>
        <div className={styles.portfolio}>
            {photos.thumbnails.map(imgSrc => (
                <Thumbnail key={imgSrc} imgSrc={imgSrc} onClick={() => updateGalleryItems(imgSrc)}
                           onLoad={onThumbnailLoad}/>
            ))}
        </div>
        {galleryItems && (
            <div className={styles.gallery}>
                <Gallery photos={galleryItems} onClose={() => updateGalleryItems(null)}/>
            </div>
        )}
    </>;
};
