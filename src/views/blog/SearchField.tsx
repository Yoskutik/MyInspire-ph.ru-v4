import React, {
    CSSProperties, FC, useCallback, useRef, useState, 
} from 'react';
import { useRouter } from 'next/router';
import { debounce } from '@utils';
import { Button } from '@components';
import { SearchIcon, DeleteIcon } from '@components/icons';
import styles from '@sass/pages/blog/SearchField.module.scss';

export const SearchField: FC<{ style?: CSSProperties, cls?: string }> = ({ style, cls = '' }) => {
    const router = useRouter();
    const ref = useRef<HTMLInputElement>();
    const [value, setValue] = useState((router.query.keyword || router.query.query || '') as string);
    const clear = useCallback(() => setValue(''), []);

    const search = () => {
        if (value.trim().length < 3) return;
        router.push({
            pathname: '/blog/',
            query: { query: ref.current.value.trim() },
        });
    };

    const onKeyDown = useCallback(debounce((evt: KeyboardEvent) => {
        if (evt.key !== 'Enter') return;
        search();
    }), []);

    return (
        <label className={`${styles.label} ${cls}`} style={style}>
            <input className={styles.input} type="text" maxLength={128} minLength={3} onKeyDown={onKeyDown}
                   value={value} ref={ref} onChange={evt => setValue(evt.currentTarget.value)}/>
            {value && (
                <Button cls={styles.button} onClick={clear} icon={DeleteIcon}/>
            )}
            <Button cls={styles.button} onClick={search} icon={SearchIcon}/>
        </label>
    );
};
