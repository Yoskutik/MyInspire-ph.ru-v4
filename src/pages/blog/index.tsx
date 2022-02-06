import React, { FC } from 'react';
import { GetServerSideProps } from 'next';
import { FetchRequest } from '@utils';
import { Container, MainLayout } from '@components';
import { BlogItem, IBlogItem, SearchField, Pager } from '@views/blog';
import blog from '@data/blog.json';
import styles from '@sass/pages/blog/BlogPage.module.scss';

const title = 'Фотограф в Санкт-Петербурге | Мельникова Татьяна | Личный блог';
const description = `Здесь я даю советы о том, что нужно сделать, чтобы получить от фотосессии самые лучше кадры;
рассказываю о себе и о внутренней кухне фотографии`;
const keywords = 'Фотограф Санкт-Петербург, Мельникова Татьяна, Фотограф СПб, Фотосессия СПб, личный блог, фотография';

const BlogPage: FC<{ items: IBlogItem[], maxPage }> = ({ items, maxPage }) => (
    <MainLayout title={title} description={description} keywords={keywords}>
        <Container cls={styles.container}>
            <SearchField cls={styles.search}/>
            {items.map(it => (
                <BlogItem key={it.title} item={it}/>
            ))}
            <Pager maxPage={maxPage}/>
        </Container>
    </MainLayout>
);

export default BlogPage;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    const page: number = +(query.page || 1);
    let initialBlogs: IBlogItem[];
    if (query.query) {
        const titles: string[] = await new FetchRequest({ url: '/blog/search', params: { query: query.query } })
            .request();
        initialBlogs = blog.filter(it => titles.includes(it.title));
    } else if (query.keyword) {
        const titles: string[] = await new FetchRequest({ url: '/blog/search', params: { keyword: query.keyword } })
            .request();
        initialBlogs = blog.filter(it => titles.includes(it.title));
    } else {
        initialBlogs = blog;
    }
    const items = initialBlogs.map(it => {
        const newIt = { ...it };
        const arr = [];
        const words = (newIt.body[0] as string).split(' ');
        let length = 0;
        for (let i = 0; i < words.length; i++) {
            length += words[i].length + 1;
            arr.push(words[i]);
            if (length >= 128) break;
        }
        newIt.body = [arr.join(' ')];
        return newIt;
    });

    return {
        props: {
            items: items.slice((page - 1) * 4, page * 4),
            maxPage: Math.ceil(items.length / 4),
        },
    };
};
