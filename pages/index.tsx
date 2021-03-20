import React, { FC } from 'react';
import { GetServerSideProps } from 'next';
import { MainLayout } from '@components';
import { Home, HomeProps } from '@views/home';
import { getPhotos } from '@utils/server';

const title = 'Фотограф в Санкт-Петербурге | Мельникова Татьяна';
const description = 'Атмосферные фото в Санкт-Петербурге от профессионального фотографа. Экспресс фотосессия от ' +
    '3000 ₽. Студийные фотосессии и фотопроуглки.';
const keywords = 'Фотограф Санкт-Петербург, Мельникова Татьяна, Фотограф СПб, Фотосессия СПб';

const HomePage: FC<HomeProps> = ({ isMobile, photos }) => (
    <MainLayout title={title} description={description} keywords={keywords}>
        <Home isMobile={isMobile} photos={photos}/>
    </MainLayout>
);

export default HomePage;

export const getServerSideProps: GetServerSideProps = async ({ req }) => ({
    props: {
        isMobile: /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(req.headers['user-agent']),
        photos: {
            vertical: getPhotos('/home/vertical/').sort(() => Math.random() - 0.5),
            horizontal: getPhotos('/home/horizontal/').sort(() => Math.random() - 0.5),
        },
    },
});
