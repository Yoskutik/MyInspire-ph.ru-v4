import React, { FC, memo } from 'react';
import Link from 'next/link';
import { Container, Picture } from '@components';
import { InstagramIcon, VKIcon, WhatsAppIcon } from '@components/icons';
import styles from '@sass/pages/home/Info.module.scss';

const Card: FC = () => (
    <div className={styles.info__card} itemScope itemType="http://schema.org/Organization">
        <link itemProp="url" href="https://myinspire-ph.ru/" />
        <div className={styles.info__card_avatar}>
            <Picture src="/photos/ava.jpg"/>
        </div>
        <div className={styles.info__card_message}>
            <h2 itemProp="name" className={styles.info__card_title}>
                Мельникова Татьяна
            </h2>
            <h1 itemProp="jobTitle" className={styles.info__card_subtitle}>
                Профессиональный фотограф в Санкт-Петербурге
            </h1>
            <p className={styles.info__card_description}>
                Индивидуальные фотосессии и love-story
            </p>
            <div className={styles.info__card_social}>
                <a itemProp="sameAs" href="https://www.instagram.com/myinspire_ph/" target="_blank" rel="noreferrer">
                    <InstagramIcon size={38}/>
                </a>
                <a itemProp="sameAs" href="https://vk.com/inspiredbyspb/" target="_blank" rel="noreferrer">
                    <VKIcon size={38}/>
                </a>
                <a itemProp="sameAs" href="https://wa.me/79995154217" target="_blank" rel="noreferrer">
                    <WhatsAppIcon size={38}/>
                </a>
            </div>
        </div>
    </div>
);

const Message: FC = () => (
    <div className={styles.info__message}>
        <h3 className={styles.info__message_title}>Обо мне</h3>
        <p>
            Я профессиональный фотограф. Занимаюсь организацией съёмок в студиях и на улице больше трёх лет. Сотрудничаю
            с профессиональными визажистами и стилистами. Помогаю с организацией съёмок и воплощением самых смелых идей.
            Снимаю портреты в различных стилях:
            {' '}
            <a href="#Love-Story">Love Story</a>, <a href="#Портрет">портрет</a>,
            {' '}
            <a href="#Студийная-съёмка">студийная съемка</a>, <a href="#Фотопрогулка">фотопрогулка</a>.
        </p>
        <p>
            Работая с каждым человеком, я стараюсь, чтобы он раскрылся, чтобы у него остались самые приятные
            воспоминания в виде фотографий от меня. Если Вам нужна фотосессия в студии — я готова предоставить свою базу
            проверенных фотостудий в Санкт-Петербурге. Если Вы приехали в город и желаете получить фотографии на фоне
            самых известных достопримечательностей — я помогу составить Вам наиболее комфортный маршрут по городу.
        </p>
        <p>
            Фотография — это то, чем я живу. Ни проходит ни дня, когда бы я не занималась все большим погружением в эту
            сферу или проведением творческих съёмок. Портрет — это одна из тех вещей, которая может по-настоящему
            раскрыть всю красоту человека. Для меня фотография — это искусство. И я сделаю все возможное, чтобы Вы стали
            его частью.
        </p>
        <p>
            Со всеми моими работами в высоком разрешении можно ознакомиться по
            {' '}
            <Link href="/portfolio/"><a>ссылке</a></Link>
            .
        </p>
    </div>
);

export const Info: FC<{ marginTop: number }> = memo(({ marginTop }) => (
    <div className={styles.info} style={{ marginTop }}>
        <Container cls={styles.info__container}>
            <Message />
            <Card />
        </Container>
    </div>
));
