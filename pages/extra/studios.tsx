import React, { FC, useState } from 'react';
import { GetServerSideProps } from 'next';
import { Filters, IFilters, Hall } from '@views/extra/studios';
import studios from '@data/studios.json';
import hals from '@data/halls.json';
import { getPhotos } from '@utils/server';
import { Breadcrumbs, Container, MainLayout } from '@components';

const ExtraStudiosPage: FC<{ images: string[] }> = ({ images }) => {
    const [filters, setFilters] = useState<IFilters>({
        furniture: null,
        darkness: null,
        by: null,
    });

    const filteredHalls = hals.filter(hall => filters.darkness === null || hall.darkness === filters.darkness)
        .filter(hall => filters.furniture === null || hall.furniture === filters.furniture);

    filteredHalls.sort((a, b) => {
        if (filters.by === null) return 0;
        return filters.by === 'asc' ? a.prices[0] - b.prices[0] : b.prices[0] - a.prices[0];
    });

    return (
        <MainLayout title="Проверенные студии" robots={false}>
            <Breadcrumbs/>
            <Container>
                <Filters filters={filters} onChange={setFilters} />
                {filteredHalls.map(hall => (
                    <Hall {...hall} studioInfo={studios[hall.studio]} key={hall.title}
                          photos={images.filter(it => it.includes(hall.photos_dir))} />
                ))}
            </Container>
        </MainLayout>
    );
};

export default ExtraStudiosPage;

export const getServerSideProps: GetServerSideProps = async () => ({
    props: {
        images: getPhotos('/extra/studios/'),
    },
});
