import React, { FC, memo } from 'react';
import { $$, debounce, isElementVisible, useEventListener } from '@utils';
import { Container, Picture } from '@components';
import genres from '@data/genres.json';
import styles from '@sass/pages/home/Genres.module.scss';

interface GenreProps {
    imgSrc: string;
    paragraphs: string[];
    title: string;
}

const Genre: FC<GenreProps> = ({ imgSrc, paragraphs, title }) => (
    <Container cls={styles.genres__container}>
        <div className={styles.genres__genre} id={title.replace(/ /g, '-')}>
            <div className={styles.genres__container_photo}>
                <Picture src={imgSrc}/>
            </div>
            <div className={styles.genres__container_info}>
                <h3 className={styles.genres__container_title}>{title}</h3>
                {paragraphs.map((p, i) => (
                    <p className={styles.genres__container_paragraph} key={`genres__container_paragraph-${i}`}>
                        {p}
                    </p>
                ))}
            </div>
        </div>
    </Container>
);

export const Genres: FC = memo(() => {
    useEventListener(globalThis, 'scroll', debounce(() => {
        $$(`.${styles.genres__container}`).forEach(it => {
            if (isElementVisible(it, 50)) {
                it.style.transform = 'translateY(0)';
                it.style.opacity = '1';
            } else {
                it.style.opacity = '0';
                it.style.transform = `translateY(${80 * Math.sign(it.getBoundingClientRect().bottom)}px)`;
            }
        });
    }, 50));

    return (
        <div className={styles.genres}>
            {genres.map((genre, i) => (
                <Genre key={`genre-${i}`} {...genre} imgSrc={`/photos/home/${genre.imgSrc}.jpg`}/>
            ))}
        </div>
    );
});
