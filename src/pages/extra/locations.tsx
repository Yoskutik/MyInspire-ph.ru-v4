import React, { FC } from 'react';
import { GetServerSideProps } from 'next';
import { Breadcrumbs, Container, MainLayout } from '@components';
import { getPhotos } from '@utils/server';
import { Location } from '@views/extra/Location';
import locations from '@data/locations.json';

const description = 'Найдите для себя наилучший маршрут по Питеру для фотопрогулки. Посмотрите на подборку локаций '
    + 'в центре и не только, оцените их длительность, и подходят ли Вам такие фоны';

const ExtraLocationsPage: FC<{ images: string[] }> = ({ images }) => (
    <MainLayout title="Мельникова Татьяна | Подборка локаций для фотосессии" description={description} robots={false}>
        <Breadcrumbs/>
        <Container>
            {locations.map(loc => (
                <Location key={loc.title} location={{
                    photosList: images.filter(it => it.includes(loc.photosDir)),
                    ...loc,
                }}/>
            ))}
        </Container>
    </MainLayout>
);

export default ExtraLocationsPage;

export const getServerSideProps: GetServerSideProps = async () => ({
    props: {
        images: getPhotos('/extra/locations/').filter(it => it.endsWith('m')),
    },
});
