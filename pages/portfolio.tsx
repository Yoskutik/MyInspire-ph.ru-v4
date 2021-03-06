
import React, { FC } from 'react';
import { GetServerSideProps } from 'next';
import { MainLayout } from '@components';
import { Portfolio, PortfolioProps } from '@views/portfolio';
import { getPhotos } from '@utils/server';

const title = 'Мельникова Татьяна | Портфолио';
const description = 'Лавстори, фотопрогулка, студийная фотосессия и профессиональная ретушь. Здесь находится мое '
    + 'портфолио.';
const keywords = 'Фотограф Санкт-Петербург портфолио, Мельникова Татьяна портфолио, Фотограф СПб портфолио, Фотограф '
    + 'портфолио';

const PortfolioPage: FC<PortfolioProps> = ({ isMobile, photos }) => (
    <MainLayout title={title} description={description} keywords={keywords} customSpinnerRemove>
        <Portfolio isMobile={isMobile} photos={photos}/>
    </MainLayout>
);

export default PortfolioPage;

export const getServerSideProps: GetServerSideProps = async ({ req }) => ({
    props: {
        isMobile: /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(req.headers['user-agent']),
        photos: {
            gallery: getPhotos('/portfolio/gallery/').filter(it => !it.endsWith('m')),
            thumbnails: getPhotos('/portfolio/thumbnails/'),
        },
    },
});
