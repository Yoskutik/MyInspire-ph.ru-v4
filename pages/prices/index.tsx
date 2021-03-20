import React, { FC } from 'react';
import { MainLayout } from '@components';
import { Prices } from '@views/prices';

const title = 'Фотограф в Санкт-Петербурге | Мельникова Татьяна | Цены';
const description = 'Фотопрогулка mini 5000 ₽. Фотопрогулка maxi и студийная съёмка 7000 ₽. Свадебные съёмки от 7000 ₽.'
    + ' Есть возможность покупки дополнительного времени';
const keywords = 'Фотограф Санкт-Петербург цены, Мельникова Татьяна цены, Фотограф СПб цены, Фотограф цены';

const PricesPage: FC = () => (
    <MainLayout title={title} description={description} keywords={keywords}>
        <Prices/>
    </MainLayout>
);

export default PricesPage;
