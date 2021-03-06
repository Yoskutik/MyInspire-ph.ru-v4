import React, {
    CSSProperties, FC, TouchEvent, useCallback, useEffect, useRef, useState,
} from 'react';
import { $, useEventListener } from '@utils';
import { Picture } from '@components';
import { ArrowIcon, FullScreenCloseIcon, FullScreenOpenIcon } from '@components/icons';
import styles from '@sass/pages/portfolio/Gallery.module.scss';
import { scrollTo } from './betterScroll';

interface GalleryProps {
    photos: string[];
    onClose: () => void;
}

let lastClickedIndexInLocking: number = null;
let touchStartX: number;

export const Gallery: FC<GalleryProps> = ({ photos, onClose }) => {
    const [mainIndex, setMainIndex] = useState(0);
    const [lastIndex, setLastIndex] = useState(0);
    const [picStyle, setPicStyle] = useState<CSSProperties>();
    const [locked, setLocked] = useState(false);
    const [fullScreenOpened, setFullScreenOpened] = useState(false);
    const ref = useRef<HTMLDivElement>();

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        window.location.hash = 'gallery';

        return () => {
            document.body.style.overflow = null;
        };
    });

    useEventListener(globalThis, 'hashchange', () => {
        if (window.location.hash === '') onClose();
    }, false);

    const openFullScreen = useCallback(async () => {
        await document.body.requestFullscreen();
        setFullScreenOpened(true);
    }, []);

    const closeFullScreen = useCallback(async () => {
        await document.exitFullscreen();
        setFullScreenOpened(false);
    }, []);

    const chooseImage = (index: number, changeLastIndex = true) => {
        if (locked) {
            lastClickedIndexInLocking = index;
            return;
        }
        let boundedIndex = index >= 0 ? index : photos.length - 1;
        boundedIndex = boundedIndex < photos.length ? boundedIndex : 0;
        console.log(mainIndex, boundedIndex);
        if (boundedIndex === mainIndex) return;
        const el = ref.current;
        const scrollSize = window.innerWidth > 767
            ? ((el.scrollHeight - el.clientHeight + 50) / photos.length)
            : ((el.scrollWidth - el.clientWidth + 40) / photos.length);
        changeLastIndex && setLastIndex(mainIndex);
        setMainIndex(boundedIndex);
        setLocked(true);
        setPicStyle({ left: boundedIndex < mainIndex ? '-100%' : 0 });
        scrollTo(ref.current, boundedIndex * scrollSize, {
            direction: window.innerWidth > 767 ? 'vertical' : 'horizontal',
        });
        setTimeout(() => {
            setPicStyle({ left: boundedIndex < mainIndex ? 0 : '-100%' });
            const onAnimationEnd = () => {
                setLastIndex(boundedIndex);
                setPicStyle(null);
                setLocked(false);
                $(`.${styles.mainContainer} picture`).removeEventListener('transitionend', onAnimationEnd);
                if (lastClickedIndexInLocking !== null) {
                    setTimeout(() => {
                        const i = lastClickedIndexInLocking;
                        lastClickedIndexInLocking = null;
                        chooseImage(i, false);
                    });
                }
            };
            $(`.${styles.mainContainer} picture`).addEventListener('transitionend', onAnimationEnd);
        });
    };

    const choosePrev = () => chooseImage(mainIndex - 1);
    const chooseNext = () => chooseImage(mainIndex + 1);

    const onTouchStart = (evt: TouchEvent) => touchStartX = evt.touches[0].clientX;
    const onTouchEnd = (evt: TouchEvent) => {
        const diff = evt.changedTouches[0].clientX - touchStartX;
        touchStartX = null;
        if (Math.abs(diff) < 20) return;
        diff > 0 ? choosePrev() : chooseNext();
    };

    return (
        <div className={styles.gallery}>
            <div className={styles.thumbnailsContainer} ref={ref}>
                {photos.map((it, i) => (
                    <Picture src={`/photos/portfolio/gallery/${it}m.jpg`} key={it} onClick={() => chooseImage(i)}
                             imgCls={`${styles.thumbnail} ${i === mainIndex ? styles.active : ''}`}/>
                ))}
            </div>
            <div className={styles.mainContainer} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
                {lastIndex > mainIndex && <>
                    <Picture src={`/photos/portfolio/gallery/${photos[mainIndex]}.jpg`} imgCls={styles.mainPhoto}
                             style={picStyle} width={1200} height={1800}/>
                    <Picture src={`/photos/portfolio/gallery/${photos[lastIndex]}.jpg`} imgCls={styles.mainPhoto}
                             style={picStyle} width={1200} height={1800}/>
                </>}
                {lastIndex < mainIndex && <>
                    <Picture src={`/photos/portfolio/gallery/${photos[lastIndex]}.jpg`} imgCls={styles.mainPhoto}
                             style={picStyle} width={1200} height={1800}/>
                    <Picture src={`/photos/portfolio/gallery/${photos[mainIndex]}.jpg`} imgCls={styles.mainPhoto}
                             style={picStyle} width={1200} height={1800}/>
                </>}
                {lastIndex === mainIndex && (
                    <Picture src={`/photos/portfolio/gallery/${photos[mainIndex]}.jpg`} imgCls={styles.mainPhoto}
                             width={1200} height={1800}/>
                )}
                <button className={`${styles.button} ${styles.left}`} onClick={choosePrev}>
                    <ArrowIcon size={36}/>
                </button>
                <button className={`${styles.button} ${styles.right}`} onClick={chooseNext}>
                    <ArrowIcon size={36}/>
                </button>
                {fullScreenOpened ? (
                    <button className={`${styles.button} ${styles.fullscreen}`} onClick={closeFullScreen}>
                        <FullScreenCloseIcon size={24}/>
                    </button>
                ) : (
                    <button className={`${styles.button} ${styles.fullscreen}`} onClick={openFullScreen}>
                        <FullScreenOpenIcon size={24}/>
                    </button>
                )}
            </div>
            <button className={styles.close} onClick={() => window.history.back()} type="button">
                &times;
            </button>
        </div>
    );
};
