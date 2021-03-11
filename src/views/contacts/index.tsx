import { ToastProvider } from 'react-toast-notifications';
import React, { FC } from 'react';
import { Container } from '@components';
import styles from '@sass/pages/contacts/Contacts.module.scss';
import { ContactsCard } from './ContactsCard';
import { ContactsFeedback } from './ContactsFeedback';

const Intro: FC = () => (
    <Container cls={styles.intro}>
        <div className={styles.intro__container}>
            <h2 className={styles.intro__title}>Запись на съёмку</h2>
            <div className={styles.intro__text}>
                <p>
                    Если вы ознакомились со всеми ценами, прочли условия и осознали,
                    что я - именно тот, кого Вы так давно искали, то скорее пишите мне
                    в удобной Вам социальной сети и мы с Вами обсудим все детали.
                </p>
                <p>
                    У меня не всегда бывает возможность моментально отвечать. Обычно
                    ответ занимает не больше суток. Прошу отнестись к этому с пониманием.
                </p>
            </div>
        </div>
    </Container>
);

export const Contacts: FC = () => <>
    <Intro/>
    <Container cls={styles.contacts}>
        <Container cls={styles.contacts__container}>
            <ToastProvider placement="bottom-right">
                <ContactsCard/>
                <ContactsFeedback/>
            </ToastProvider>
        </Container>
    </Container>
</>;
