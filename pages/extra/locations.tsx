import React, { FC } from 'react';
import { GetServerSideProps } from 'next';
import { getPhotos } from '@utils/server';
import { Location } from '@views/extra/Location';
import locations from '@data/locations.json';
import { Breadcrumbs, Container, MainLayout } from '@components';

const ExtraLocationsPage: FC<{ images: string[] }> = ({ images }) => (
    <MainLayout title="Локации для фотосессии" robots={false}>
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
