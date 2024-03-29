import React, { FC, useState } from 'react';
import { GetServerSideProps } from 'next';
import { Breadcrumbs, Container, MainLayout } from '@components';
import { Filters, IFilters, Hall } from '@views/extra/studios';
import studios from '@data/studios.json';
import hals from '@data/halls.json';
import { getPhotos } from '@utils/server';

const description = 'Посмотрите на подборку проверенных студий в Санкт-Петербурге, отфильтруйте их по стоимости, общему'
    + ' тону и наличию мебели, и найдите подходящую для Вас.';

const ExtraStudiosPage: FC<{ images: string[] }> = ({ images }) => {
    const [filters, setFilters] = useState<IFilters>({ furniture: null });

    const filteredHalls = hals.filter(hall => filters.furniture === null || hall.furniture === filters.furniture);

    return (
        <MainLayout title="Мельникова Татьяна | Подборка проверенных студий" description={description} robots={false}>
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
    props: { images: getPhotos('/extra/studios/') },
});
