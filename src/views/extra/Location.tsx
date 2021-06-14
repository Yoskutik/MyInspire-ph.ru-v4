import React, { FC, useRef, useState } from 'react';
import { Picture } from '@components';
import { ArrowIcon } from '@components/icons';
import styles from '@sass/pages/extra/Location.module.scss';

interface ILocation {
    title: string;
    address: {
        location: string;
        href: string;
    },
    locations: string[];
    photosDir: string;
    photosList: string[];
    timeNeeded: number;
    duration: number;
}

interface LocationProps {
    location: ILocation;
}

export const Location: FC<LocationProps> = ({ location }) => {
    const [mainIndex, setMainIndex] = useState(0);
    const ref = useRef(null);
    const mainPhoto = location.photosList[mainIndex];

    let duration: string = null;
    if (location.duration === 1) {
        duration = 'Идеален для Фотопрогулки mini';
    } else if (location.duration === 2) {
        duration = `При заказе Фотопрогулки mini локации проходятся не в полном объёме, 
            поэтому если есть в списке локаций ваш фаворит, то предупредите меня об этом заранее.`;
    }

    return (
        <div className={styles.location} ref={ref}>
            <div className={styles.photos}>
                <Picture alt={location.title} imgCls={styles.mainPhoto}
                         src={`/photos/extra/locations/${mainPhoto.replace(/m$/, '')}.jpg`}/>
                <div className={styles.extra}>
                    <ArrowIcon cls={`${styles.arrow} ${styles.up}`} size={12} fill="#fff" />
                    <div className={styles.photosContainer}>
                        {location.photosList.map((ph, i) => (
                            <Picture alt={location.title} src={`/photos/extra/locations/${ph}.jpg`} lazy={i > 3}
                                     key={ph} onClick={() => setMainIndex(i)}
                                     imgCls={i === mainIndex ? styles.active : ''}/>
                        ))}
                    </div>
                    <ArrowIcon cls={`${styles.arrow} ${styles.down}`} size={12} fill="#fff"/>
                </div>
            </div>
            <div className={styles.info}>
                <h2 className={styles.title}>{location.title}</h2>
                Локации маршрута:
                <ul className={styles.list}>
                    {location.locations.map(l => <li key={Math.random()}>{l}</li>)}
                </ul>
                <p>{`Время на перемещение: ${location.timeNeeded} мин.`}</p>
                {duration}
                <p className={styles.address}>
                    Адрес:
                    {' '}
                    <a href={`https://www.google.com/maps/${location.address.href}`} target="_blank" rel="noreferrer">
                        {location.address.location}
                    </a>
                </p>
            </div>
        </div>
    );
};
