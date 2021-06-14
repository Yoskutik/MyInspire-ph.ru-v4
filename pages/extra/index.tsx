import React from 'react';
import Link from 'next/link';
import { Breadcrumbs, MainLayout } from '@components';
import styles from '@sass/pages/extra/Extra.module.scss';

const description = 'Здесь Вы сможете подобрать для себя подходящую студию, составить наилучший маршрут для '
    + 'фотопрогулки, найти себе проверенного мной визажиста или посмотреть как себя себя вести при позировании.';

export default function ExtraPage(): JSX.Element {
    return (
        <MainLayout title="Фотограф в Санкт-Петербурге | Мельникова Татьяна" description={description} robots={false}>
            <Breadcrumbs/>
            <div className={styles.block}>
                <nav className={styles.nav}>
                    <Link href="/extra/studios/"><a className={styles.link}>Студии</a></Link>
                    <Link href="/extra/locations/"><a className={styles.link}>Локации для фотопрогулки</a></Link>
                    <Link href="/extra/poses/"><a className={styles.link}>Шпаргалка по позированию</a></Link>
                    <Link href="/extra/stylists/"><a className={styles.link}>Контакты визажистов и стилистов</a></Link>
                </nav>
            </div>
            <style jsx global>{`
                .page:not(.page--loading) {
                    height: 100%;
                }
            `}</style>
        </MainLayout>
    );
}
