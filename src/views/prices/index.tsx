import React, { FC, Fragment } from 'react';
import { Container } from '@components';
import conditions from '@data/conditions.json';
import listItems from '@data/priceList.json';
import styles from '@sass/pages/prices/Prices.module.scss';
import { RubbleIcon } from '@components/icons';

interface ListItemProps {
    title: string;
    description: string[];
    price: number;
    additional?: string;
    discount?: number;
}

const ListItem: FC<ListItemProps> = ({ title, description, price, additional, discount }) => (
    <div className={styles.list__item}>
        <div className={styles.list__item_header}>
            <h2 className={styles.list__item_title}>{title}</h2>
        </div>
        <p className={styles.list__item_info} itemProp="description">
            {description.map((it, i) => (
                <Fragment key={`${title}-${i}`}>
                    {it}
                    <br/>
                </Fragment>
            ))}
            {additional && (
                <small>{`* ${additional}`}</small>
            )}
        </p>
        <div className={styles['list__item_price-column']}>
            <strong className={`${styles.list__item_price} ${discount ? styles.discount : ''}`}>{price}</strong>
            {discount && (
                <strong className={styles.list__item_price}>
                    <span>{discount}</span>
                </strong>
            )}
        </div>
    </div>
);

const PriceList: FC = () => (
    <Container cls={styles.list}>
        {listItems.slice(0, 4).map((item, i) => (
            <ListItem key={`list-item-${i}`} {...item}/>
        ))}
        <hr/>
        {listItems.slice(4).map((item, i) => (
            <ListItem key={`list-item-${i}`} {...item}/>
        ))}
    </Container>
);

const Conditions: FC = () => <>
    {conditions.map((cond, i) => (
        <Container cls={styles.conditions} key={`condition-${i}`}>
            <h3 className={styles.conditions__title}>{cond.title}</h3>
            {cond.paragraphs.map((p, j) => (
                <p className={styles.conditions__text} key={`conditions__text-${j}`}>{p}</p>
            ))}
        </Container>
    ))}
</>;

export const Prices: FC = () => <>
    <PriceList/>
    <Conditions/>
</>;
