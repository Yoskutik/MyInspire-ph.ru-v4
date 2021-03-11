import React, { FC, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEventListener } from '@utils';
import { Container, MenuButton } from '@components';
import styles from '@sass/mainLayout/Header.module.scss';

const NavLink: FC<{ href: string, title: string, active: boolean }> = ({ href, title, active }) => (
    <Link href={href}>
        <a>
            {active ? (
                <h3>{title}</h3>
            ) : (
                <span>{title}</span>
            )}
        </a>
    </Link>
);

const Nav: FC<{ visible: boolean, path: string }> = ({ visible, path }) => (
    <div className={styles.header__nav} itemScope itemType="http://schema.org/SiteNavigationElement"
         style={{ display: visible ? 'flex' : '' }}>
        <NavLink href="/" title="Главная" active={path === '/'}/>
        <NavLink href="/portfolio/" title="Портфолио" active={path === '/portfolio'}/>
        <NavLink href="/prices/" title="Цены" active={path === '/prices'}/>
        <NavLink href="/contacts/" title="Контакты" active={path === '/contacts'}/>
        <NavLink href="/blog/" title="Блог" active={path === '/blog'}/>
    </div>
);

export const Header: FC = () => {
    const [navIsVisible, setNavIsVisible] = useState(false);
    const router = useRouter();

    useEventListener(globalThis, 'click', evt => {
        const el = evt.target as HTMLElement;
        if (!el) return;
        if (navIsVisible && !el.closest(`.${styles.header__nav}`)) setNavIsVisible(false);
    }, false);

    return (
        <header className={styles.header}>
            <Container cls={styles.header__container}>
                <MenuButton onClick={() => setNavIsVisible(!navIsVisible)} />
                <Nav visible={navIsVisible} path={router.pathname} />
                <h2 className={styles.header__title} title="Фотограф в Санкт-Петербурге">
                    MyInspire photographer
                </h2>
            </Container>
        </header>
    );
};
