import React, { FC } from 'react';
import { Breadcrumbs, Container, MainLayout } from '@components';
import stylists from '@data/stylists.json';
import styles from '@sass/pages/extra/Stylists.module.scss';

interface StylistsProps {
    name: string;
    type: string;
    username: string;
}

const Stylist: FC<StylistsProps> = ({ name, type, username }) => (
    <div className={styles.stylists__item}>
        <div className={styles.stylists__item_column}>
            <h2 className={styles.stylists__item_title}>{name}</h2>
            <h3 className={styles.stylists__item_subtitle}>{type}</h3>
        </div>
        <div className={styles.stylists__item_column}>
            <span>
                Контакты:
                {' '}
                <a className={styles.stylists__item_instagram} href={`https://www.instagram.com/${username}/`}
                   target="_blank" rel="noreferrer">
                    {`@${username}`}
                </a>
            </span>
        </div>
    </div>
);

export default function ExtraStylistsPage(): JSX.Element {
    return (
        <MainLayout title="Стилисты и визажисты" robots={false}>
            <Breadcrumbs/>
            <Container>
                <p className={styles.intro}>
                    Это девушки, с которыми я работала на съёмках и за чьи работы я могу быть уверена и советовать их
                    Вам как проверенных мастеров.
                </p>
                <div className={styles.stylists}>
                    {stylists.map(stylist => (
                        <Stylist key={stylist.username} {...stylist} />
                    ))}
                    <p className={styles.stylists__caption}>
                        * Услуги стилистов и визажистов бронируются и оплачиваются Вами отдельно.
                        <br />
                        ** Гримёрка для сборов оплачивается отдельно. Обычно в студиях её цена варьируется от 200 до 300
                        ₽ за час.
                    </p>
                </div>
            </Container>
        </MainLayout>
    );
}
