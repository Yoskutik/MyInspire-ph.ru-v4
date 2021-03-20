import React, { FC } from 'react';
import { GetServerSideProps } from 'next';
import sizeOf from 'image-size';
import { MainLayout } from '@components';
import { Home, HomeProps } from '@views/home';
import { getPhotos } from '@utils/server';
import getConfig from 'next/config';

const title = 'Фотограф в Санкт-Петербурге | Мельникова Татьяна';
const description = 'Атмосферные фото в Санкт-Петербурге от профессионального фотографа. Экспресс фотосессия от ' +
    '3000 ₽. Студийные фотосессии и фотопроуглки.';
const keywords = 'Фотограф Санкт-Петербург, Мельникова Татьяна, Фотограф СПб, Фотосессия СПб';

const HomePage: FC<HomeProps> = ({ isMobile, photos, size }) => (
    <MainLayout title={title} description={description} keywords={keywords}>
        <Home isMobile={isMobile} photos={photos} size={size}/>
    </MainLayout>
);

export default HomePage;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    // eslint-disable-next-line max-len
    const isMobile = /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(req.headers['user-agent']);
    const photos = isMobile
        ? getPhotos('/home/vertical/').sort(() => Math.random() - 0.5)
        : getPhotos('/home/horizontal/').sort(() => Math.random() - 0.5);
    const { serverRuntimeConfig } = getConfig();
    const size = sizeOf(
        `${serverRuntimeConfig.rootDir}/public/photos/home/${isMobile ? 'vertical' : 'horizontal'}/${photos[0]}.jpg`,
    );

    return {
        props: {
            isMobile,
            photos,
            size: [size.width, size.height],
        },
    };
};
