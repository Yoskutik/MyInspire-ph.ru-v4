import React, { FC, useContext } from 'react';
import { copyToClipboard } from '@utils';
import { ToastContext } from '@components';
import {
    InstagramIcon, VKIcon, PinterestIcon, WhatsAppIcon, CopyIcon,
} from '@components/icons';
import styles from '@sass/pages/contacts/Contacts.module.scss';

const email = 'tatiana.mix.1910@gmail.com';
const tel = '+7 (999) 515-42-17';

const Links: FC = () => {
    const { makeToast } = useContext(ToastContext);

    const onCopyClick = (str: string, body: string): void => {
        copyToClipboard(str);
        makeToast({ body });
    };

    return (
        <div className={styles.contacts__links}>
            <p className={styles.contacts__links_item}>
                E-mail:
                <a className={styles.email} itemProp="email" href={`mailto:${email}`}>
                    {email}
                </a>
                <button className={styles.contacts__links_copy} type="button"
                        onClick={() => onCopyClick(email, 'Адрес электронной почты был скопирован')}>
                    <CopyIcon size={16} />
                </button>
            </p>
            <p className={styles.contacts__links_item}>
                Телефон:
                <a className={styles.tel} href={`tel:${tel}`} itemProp="telephone">
                    {tel}
                </a>
                <button className={styles.contacts__links_copy} type="button"
                        onClick={() => onCopyClick(tel, 'Номер телефона был скопирован')}>
                    <CopyIcon size={16} />
                </button>
            </p>
            <p className={styles.contacts__links_item}>Для связи в WhatsApp, Telegram</p>
        </div>
    );
};

const Social = () => (
    <div className={styles.contacts__social}>
        <h3 className={styles.contacts__social_title}>Социальные сети:</h3>
        <div className={styles.contacts__social_links}>
            <a itemProp="sameAs" href="https://www.instagram.com/myinspire_ph/" target="_blank" rel="noreferrer">
                <InstagramIcon size={38} />
            </a>
            <a itemProp="sameAs" href="https://vk.com/inspiredbyspb" target="_blank" rel="noreferrer">
                <VKIcon size={38} />
            </a>
            <a itemProp="sameAs" href="https://www.pinterest.ru/tatianamix1910/" target="_blank" rel="noreferrer">
                <PinterestIcon size={38} />
            </a>
            <a itemProp="sameAs" href="https://wa.me/79995154217/" target="_blank" rel="noreferrer">
                <WhatsAppIcon size={38} />
            </a>
        </div>
    </div>
);

const Address = () => (
    <div itemProp="address" itemScope itemType="http://schema.org/PostalAddress">
        <h2 className={`${styles.contacts__card_city} locality`} itemProp="addressLocality">г. Санкт-Петербург</h2>
    </div>
);

export const ContactsCard: FC = () => (
    <div className={`${styles.contacts__card} vcard`} itemScope itemType="http://schema.org/Organization">
        <h3 className={styles.contacts__card_title}>Контакты</h3>
        <h1 className={`${styles.contacts__card_name} fn org`} itemProp="name">Мельникова Татьяна</h1>
        <Links />
        <Address />
        <Social />
        <span className="url">
            <span className="value-title" title="https://myinspire-ph.ru/" />
        </span>
    </div>
);
