import React, { FC, Fragment } from 'react';
import { Alert, Container } from '@components';
import conditions from '@data/conditions.json';
import listItems from '@data/priceList.json';
import styles from '@sass/pages/prices/Prices.module.scss';
import Link from 'next/link';
import { createDate } from '@utils';

interface ListItemProps {
    title: string;
    description: string[];
    price: number;
    additional?: string;
    discount?: number;
    area: string;
}

const ListItem: FC<ListItemProps> = ({ title, description, price, additional, discount, area }) => (
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
            <strong className={`${styles.list__item_price} ${discount ? styles.discount : ''}`}>
                {price}
            </strong>
            {discount && (
                <strong className={styles.list__item_price}>
                    <span>{discount}</span>
                </strong>
            )}
        </div>
    </div>
);

const PriceList: FC = () => <>
    <Container cls={styles.list}>
        <Alert type="info" expiredAt={createDate(15, 11, 2021)} style={{ width: '100%', margin: '0.5rem' }}>
            Скидка при бронировании студийной съёмки активна до 15 ноября.
        </Alert>
        <h3 className={styles.title}>Индивидуальные и парные</h3>
        {listItems.usual.map((it, i) => (
            <ListItem {...it} key={Math.random()} area={`usual${i}`}/>
        ))}
        <h3 className={styles.title}>Свадебные</h3>
        {listItems.weddings.map((it, i) => (
            <ListItem {...it} key={Math.random()} area={`usual${i}`}/>
        ))}
    </Container>
    <Container style={{ marginBottom: '1rem' }}>
        <p>Дополнительное время 5000 рублей/час</p>
        <p>Выезд за пределы города на свадебную съемку - за доплату и оговаривается индивидуально.</p>
        <p>
            Я снимаю только небольшие свадьбы, не снимаю банкеты и не уделяю внимание гостям. Мои снимки про пару и про
            любовь, но пару общих кадров в загсе мы обязательно делаем.
        </p>
    </Container>
</>;

const Conditions: FC = () => <>
    {conditions.map((cond, i) => (
        <Container cls={styles.conditions} key={`condition-${i}`}>
            <h3 className={styles.conditions__title}>{cond.title}</h3>
            {cond.paragraphs.map((p, j) => (
                <p className={styles.conditions__text} key={`conditions__text-${j}`}>
                  {((paragraph) => {
                    const index = paragraph.indexOf('{studios}')
                    if (index < 0) return paragraph;

                    return <>
                      {paragraph.slice(0, index)}
                      <a href="/extra/studios/" target="_blank" rel="noreferrer" style={{ textDecoration: 'underline' }}>
                        список проверенных студий
                      </a>
                      {paragraph.slice(index + 9)}
                    </>;
                  })(p)}
                </p>
            ))}
        </Container>
    ))}
</>;

export const Prices: FC = () => <>
    <PriceList/>
    <Conditions/>
</>;
