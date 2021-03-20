import React, { FC, Fragment, useState } from 'react';
import { Container } from '@components';
import styles from '@sass/mainLayout/Footer.module.scss';

export interface ILink {
    title: string,
    href: string,
}

const footerBlockContacts: ILink[] = [
    { title: 'Instagram', href: 'https://www.instagram.com/myinspire_ph/' },
    { title: 'VK', href: 'https://vk.com/inspiredbyspb' },
    { title: 'Telegram', href: 'https://t.me/MyInspire_ph' },
    { title: 'WhatsApp', href: 'https://wa.me/79995154217' },
    { title: 'Pinterest', href: 'https://www.pinterest.ru/tatianamix1910/' },
    { title: 'Facebook', href: 'https://www.facebook.com/profile.php?id=100029685607190' },
    { title: 'E-mail', href: 'mailto:tatiana.mix.1910@gmail.com' },
    { title: 'Twitter', href: 'https://twitter.com/myinspire_ph' },
];

const footerBlockDeveloper: ILink[] = [
    { title: 'GitHub', href: 'https://www.github.com/yoskutik' },
    { title: 'StackOverflow', href: 'https://stackoverflow.com/users/11589183/yoskutik' },
    { title: 'Habr', href: 'https://habr.com/ru/users/yoskutik/' },
];

const footerBlockIcons: ILink[] = [
    { title: 'By Freepik', href: 'https://www.freepik.com/' },
    { title: 'From www.flaticon.com', href: 'https://www.flaticon.com/' },
    { title: 'Licensed by CC 3.0 BY', href: 'http://creativecommons.org/licenses/by/3.0/' },
];

interface BlockProps {
    title: string,
    links: ILink[],
}

export const Block: FC<BlockProps> = ({ title, links }) => {
    const [opened, setOpened] = useState(false);

    return (
        <div className={`${styles.footer__block} ${opened ? styles['footer__block--opened'] : ''}`}>
            <h4 className={styles.footer__block_title} onClick={() => setOpened(!opened)}>
                <span className={styles.footer__block_triangle} />
                {title}
            </h4>
            <div className={styles.footer__block_body}>
                {links.map((it, i) => (
                    <Fragment key={`${it.title}-${i}`}>
                        <a target="_blank" href={it.href} rel="noreferrer">
                            {it.title}
                        </a>
                        {(i < links.length - 1) && <br />}
                    </Fragment>
                ))}
            </div>
        </div>
    );
};

const Copyright: FC = () => (
    <span className={styles.footer__copyright} title="Мельникова Татьяна. Профессиональный фотограф">
        <meta itemProp="copyrightYear" content="2019" />
        <meta itemProp="copyrightHolder" content="Мельникова Татьяна" />
        &copy; 2019-
        {new Date().getFullYear()}
        {' '}
        MyInspire-ph.ru
    </span>
);

export const Footer: FC = () => (
    <footer className={styles.footer} itemScope itemType="http://schema.org/WPFooter">
        <Container cls={styles.footer__container}>
            <Block title="Contacts" links={footerBlockContacts} />
            <Block title="Developer" links={footerBlockDeveloper} />
            <Block title="Icons" links={footerBlockIcons} />
            <Copyright />
        </Container>
    </footer>
);
