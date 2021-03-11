import React, { FC, useState } from 'react';
import { Picture } from '@components';
import styles from '@sass/pages/extra/studios/Hall.module.scss';

interface InfoProps {
    title: string;
    prices: number[];
    contacts?: {
        phone: string;
    };
    address?: {
        location: string;
        href: string;
    };
    description: string;
    href: string;
}

interface HallProps extends InfoProps {
    photos: string[];
    studioInfo: {
        href: string;
        contacts?: {
            phone: string;
        },
        address?: {
            location: string;
            href: string;
        },
    },
    studio: string;
}

const Preview: FC<{photos: string[]}> = ({ photos }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className={styles.hall__preview}>
            <Picture alt="Фотография зала" src={`/photos/extra/studios/${photos[activeIndex]}.jpg`}
                     imgCls={`${styles['hall__preview_main-image']} ${photos.length > 1 ? '' : styles.single}`}/>
            {photos.length > 1 && (
                <div className={styles.hall__preview_images}>
                    {photos.map((photo, i) => (
                        <Picture alt="Фотография зала" onClick={() => setActiveIndex(i)} key={photo}
                                 src={`/photos/extra/studios/${photo}.jpg`}
                                 imgCls={`${styles['hall__preview_small-image']} ${i === activeIndex ? 'active' : ''}`}/>
                    ))}
                </div>
            )}
        </div>
    );
};

const priceFormatter = new Intl.NumberFormat('ru-RU');
const Info: FC<InfoProps> = props => (
    <div className={styles.hall__info}>
        <h3 className={styles.hall__info_name}>
            <a href={props.href} target="_blank" rel="noreferrer">{`Зал ${props.title}`}</a>
        </h3>
        <span className={styles.hall__info_price}>
            {props.prices.map(price => priceFormatter.format(+price)).reduce((prev, curr) => `${prev} / ${curr}`)}
        </span>
        {/* eslint-disable-next-line react/no-danger */}
        <p className={styles.hall__info_description} dangerouslySetInnerHTML={{ __html: props.description }} />
        <div className={styles.hall__info_contacts}>
            <strong>Контакты:</strong>
            <p>
                Адрес:
                {' '}
                <a href={`https://www.google.com/maps/${props.address.href}`} target="_blank" rel="noreferrer">
                    {props.address.location}
                </a>
                <br />
                {props.contacts?.phone && <>
                    Телефон:
                    {' '}
                    <a href={`tel:${props.contacts.phone}`}>{props.contacts.phone}</a>
                </>}
            </p>
        </div>
    </div>
);

export const Hall: FC<HallProps> = props => (
    <div className={styles.hall}>
        <h2 className={styles.hall__title}>
            <a href={props.studioInfo.href} target="_blank" rel="noreferrer">{props.studio}</a>
        </h2>
        <div className={styles.hall__body}>
            <Preview photos={props.photos} />
            <Info title={props.title} prices={props.prices} address={props.studioInfo.address || props.address}
                  contacts={props.studioInfo.contacts || props.contacts}
                  description={props.description} href={props.href} />
        </div>
    </div>
);
