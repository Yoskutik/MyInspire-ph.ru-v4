import React, { FC, useCallback } from 'react';
import { useRouter } from 'next/router';
import { Button, Container } from '@components';
import styles from '@sass/pages/blog/BlogPage.module.scss';

type TBlogBodyItem = string | string[];

export interface IBlogInfo {
    title: string;
    keywords: string[];
}

export interface IBlogItem extends IBlogInfo {
    body: TBlogBodyItem[];
}

export const BlogBodyParser: FC<{ body: TBlogBodyItem[], dots?: boolean }> = ({ body, dots }) => <>
    {body.map(it => {
        if (Array.isArray(it)) {
            return (
                <ul key={Math.random()}>
                    {it.map(it1 => (
                        <li key={Math.random()}>{it1}</li>
                    ))}
                </ul>
            );
        }

        if (it.startsWith('##')) {
            return (
                <h2 style={{ fontSize: '1.2rem' }} key={Math.random()}>{it.replace(/^##/, '')}</h2>
            );
        }

        return (
            <p key={Math.random()}>{dots ? `${it.replace(/\.$/, '')}...` : it}</p>
        );
    })}
</>;

export const BlogKeywords: FC<{ keywords: string[] }> = ({ keywords }) => {
    const router = useRouter();
    const onClick = (name: string) => router.push({
        pathname: '/blog/',
        query: { keyword: name },
    });

    return (
        <div className={styles.keywords}>
            {keywords.map(it => (
                <Button cls={`${styles.keyword} ${router.query.keyword === it ? styles.active : ''}`} key={it} text={it}
                        onClick={() => onClick(it)}/>
            ))}
        </div>
    );
};

export const BlogInfo: FC<{ header: IBlogInfo }> = ({ header }) => {
    const router = useRouter();

    return (
        <div className={styles.info}>
            <h2 className={styles.title} style={{ padding: 0, border: 0, fontSize: '1rem' }}
                onClick={() => router.push('/blog/[title]', `/blog/${header.title.replace(/ /g, '-')}/`)}>
                {header.title}
            </h2>
            <BlogKeywords keywords={header.keywords}/>
        </div>
    );
};

export const BlogItem: FC<{ item: IBlogItem }> = ({ item }) => {
    const router = useRouter();
    const onClick = useCallback(() => router.push('/blog/[title]/', `/blog/${item.title.replace(/ /g, '-')}/`), []);

    return (
        <Container cls={styles.containerItem}>
            <h2 className={styles.title} onClick={onClick}>
                {item.title}
            </h2>
            <BlogKeywords keywords={item.keywords}/>
            <BlogBodyParser body={item.body} dots/>
            <Button onClick={onClick} text="Подробнее"/>
        </Container>
    );
};
