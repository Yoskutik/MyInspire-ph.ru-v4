import React, { FC, useCallback } from 'react';
import styles from '@sass/pages/extra/studios/Filters.module.scss';

interface FiltersProps {
    onChange: (filters: IFilters) => void;
    filters: IFilters;
}

const FilterButton: FC<{ onClick: () => void, text?: string, active?: boolean }> = ({ onClick, text, active }) => (
    <span className={active ? styles.active : ''} onClick={onClick}>
        {text}
    </span>
);

export interface IFilters {
    furniture?: boolean;
}

export const Filters: FC<FiltersProps> = ({ onChange, filters }) => {
    const updateFilters = useCallback((newFilters: Partial<IFilters>): void => onChange({
        ...filters,
        ...newFilters,
    }), [filters]);

    return (
        <div className={styles.filters}>
            <div className={styles.switch}>
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
