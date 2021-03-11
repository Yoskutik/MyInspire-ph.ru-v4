import React, { FC, Fragment } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '@sass/components/Breadcrumbs.module.scss';
import { Container } from './Container';

interface ILink {
    title: string;
    path: string;
}

const hrefToName: Record<string, ILink> = {
    portfolio: { title: 'Портфолио', path: '/' },
    prices: { title: 'Цены', path: '/prices/' },
    contacts: { title: 'Контакты', path: '/contacts/' },
    extra: { title: 'Дополнительно', path: '/extra/' },
    poses: { title: 'Шпаргалка по позированию', path: '/extra/poses/' },
    locations: { title: 'Локации', path: '/extra/locations/' },
    studios: { title: 'Студии', path: '/extra/studios/' },
    stylists: { title: 'Стилисты', path: '/extra/stylists/' },
    blog: { title: 'Блог', path: '/blog/' },
};

export const Breadcrumbs: FC = () => {
    const router = useRouter();

    return (
        <div className={styles.container}>
            <Container cls={styles.breadcrumbs}>
                <Link href="/"><a>Главная</a></Link>
                {router.pathname.split('/').map(name => {
                    if (!hrefToName[name]) return null;

                    return (
                        <Fragment key={hrefToName[name].path}>
                            {' / '}
                            <Link href={hrefToName[name].path}><a>{hrefToName[name].title}</a></Link>
                        </Fragment>
                    );
                })}
                {router.pathname.includes('/blog/') && <>
                    {' / '}
                    <Link href={router.pathname}><a>{(router.query.title as string).replace(/-/g, ' ')}</a></Link>
                </>}
            </Container>
        </div>
    );
};
