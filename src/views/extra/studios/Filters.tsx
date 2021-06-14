import React, { FC, useCallback } from 'react';
import styles from '@sass/pages/extra/studios/Filters.module.scss';

interface FiltersProps {
    onChange: (filters: IFilters) => void;
    filters: IFilters;
}

const FilterButton: FC<{onClick: () => void, text?: string, active?: boolean}> = ({ onClick, text, active }) => (
    <span className={active ? styles.active : ''} onClick={onClick}>
        {text}
    </span>
);

const FilterCostButton: FC<{ onClick: () => void, by: 'asc' | 'desc', active?: boolean }> = ({ onClick, by, active }) => (
    <span className={`${styles.filters__cost} ${styles[by]} ${active ? styles.active : ''}`} onClick={onClick}
          title="Сортировать по увеличению стоимости">
        <span/>
        <span/>
        <span/>
    </span>
);

export interface IFilters {
    by?: 'asc' | 'desc';
    furniture?: boolean;
    darkness?: boolean;
}

export const Filters: FC<FiltersProps> = ({ onChange, filters }) => {
    const updateFilters = useCallback((newFilters: Partial<IFilters>): void => onChange({
        ...filters,
        ...newFilters,
    }), [filters]);

    return (
        <div className={styles.filters}>
            <div style={{ flex: 1 }} />
            <div className={styles.filters__block}>
                <FilterCostButton onClick={() => updateFilters({ by: filters.by === 'asc' ? 'desc' : 'asc' })}
                                  by={filters.by || 'asc'} active={!!filters.by} />
            </div>
            {/* <div className={styles.filters__block}> */}
            {/*    <FilterButton onClick={() => updateFilters({ darkness: null })} text="Все" */}
            {/*                  active={filters.darkness === null}/> */}
            {/*    <FilterButton onClick={() => updateFilters({ darkness: true })} text="Тёмные" */}
            {/*                  active={filters.darkness === true}/> */}
            {/*    <FilterButton onClick={() => updateFilters({ darkness: false })} text="Светлые" */}
            {/*                  active={filters.darkness === false}/> */}
            {/* </div> */}
            <div className={styles.filters__block}>
                <FilterButton onClick={() => updateFilters({ furniture: null })} text="Все"
                              active={filters.furniture === null}/>
                <FilterButton onClick={() => updateFilters({ furniture: true })} text="Интерьерные"
                              active={filters.furniture === true}/>
                <FilterButton onClick={() => updateFilters({ furniture: false })} text="Неинтерьерные"
                              active={filters.furniture === false}/>
            </div>
        </div>
    );
};
