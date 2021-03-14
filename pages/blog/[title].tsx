import React, { FC } from 'react';
import { GetServerSideProps } from 'next';
import {
    BlogBodyParser, BlogInfo, BlogKeywords, IBlogInfo, IBlogItem, SearchField,
} from '@views/blog';
import blog from '@data/blog.json';
import { addPostVisitor } from '@utils/server';
import { Breadcrumbs, Container, MainLayout } from '@components';
import styles from '@sass/pages/blog/Post.module.scss';

const title = 'Мельникова Татьяна | Личный блог | ';
const keywords = 'Фотограф Санкт-Петербург, Мельникова Татьяна, Фотограф СПб, Фотосессия СПб, личный блог, фотография';

const PostPage: FC<{ item: IBlogItem, headers: IBlogInfo[] }> = ({ item, headers }) => (
    <MainLayout title={title + item.title} description={item.body[0] as string} keywords={keywords}>
        <Breadcrumbs/>
        <Container cls={styles.container}>
            <div className={styles.left}>
                <SearchField style={{ marginBottom: 20 }} />
                <h2 className={styles.title}>{item.title}</h2>
                <BlogKeywords keywords={item.keywords}/>
                <BlogBodyParser body={item.body}/>
            </div>
            <div className={styles.right}>
                <b className={styles.rightTitle}>Другие посты:</b>
                {headers.map(it => (
                    <BlogInfo header={it} key={it.title}/>
                ))}
            </div>
        </Container>
    </MainLayout>
);

export default PostPage;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    const item = blog.find(it => it.title.replace(/ /g, '-') === query.title);
    addPostVisitor(query.title as string);

    return {
        props: {
            item,
            headers: blog.filter(it => it.title.replace(/ /g, '-') !== query.title)
                .sort(() => Math.random() - 0.5)
                .slice(0, 5)
                .map(it => ({
                    title: it.title,
                    keywords: it.keywords,
                })),
        },
    };
};
