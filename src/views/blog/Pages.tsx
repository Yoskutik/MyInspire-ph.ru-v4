import React, { CSSProperties, FC, KeyboardEvent } from 'react';
import { useRouter } from 'next/router';
import { Button } from '@components';
import styles from '@sass/pages/blog/Pager.module.scss';

interface PagerProps {
    maxPage: number;
    cls?: string;
    style?: CSSProperties;
}

export const Pager: FC<PagerProps> = ({ maxPage, cls = '', style }) => {
    const router = useRouter();
    const onPageChange = (newPage: number) => router.push({
        pathname: router.pathname,
        query: {
            ...router.query,
            page: newPage,
        },
    });
    const onKeyDown = (evt: KeyboardEvent<HTMLInputElement>) => {
        if (evt.key !== 'Enter') return;
        onPageChange(+evt.currentTarget.value);
    };

    const page = +router.query.page || 1;

    return (
        <div className={`${styles.pager} ${cls}`} style={style}>
            <Button cls={styles.button} text="<<" onClick={() => onPageChange(1)}/>
            <Button cls={styles.button} text="<" onClick={() => page > 1 && onPageChange(page - 1)}/>
            <label className={styles.label}>
                <input className={styles.input} type="number" min={1} defaultValue={page} onKeyDown={onKeyDown}/>
            </label>
            <Button cls={styles.button} text=">" onClick={() => page < maxPage && onPageChange(page + 1)}/>
            <Button cls={styles.button} text=">>" onClick={() => onPageChange(maxPage)}/>
        </div>
    );
};
