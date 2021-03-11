import React, { FC } from 'react';
import { MainLayout } from '@components';
import { Contacts } from '@views/contacts';

const title = 'Мельникова Татьяна | Контакты';
const description = 'Свяжитесь со мной любым удобным для Вас способом: в социальных сетях, в мессенджере или с помощью'
    + ' формы обратной связи.';
const keywords = 'Фотограф Санкт-Петербург контакты, Мельникова Татьяна контакты, Фотограф СПб контакты, Фотограф '
    + 'контакты';

const ContactsPage: FC = () => (
    <MainLayout title={title} description={description} keywords={keywords}>
        <Contacts/>
    </MainLayout>
);

export default ContactsPage;
