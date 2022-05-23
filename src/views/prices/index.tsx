import React, { FC, Fragment } from 'react';
import { Container } from '@components';
import conditions from '@data/conditions.json';
import listItems from '@data/priceList.json';
import styles from '@sass/pages/prices/Prices.module.scss';

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
    {/*<Container style={{ width: '100%', marginTop: '1rem' }}>*/}
    {/*    <Alert type="info" expiredAt={createDate(10, 2, 2022)} style={{ margin: '0 1rem' }}>*/}
    {/*        Цена актуальна при бронировании до 10 февраля*/}
    {/*    </Alert>*/}
    {/*</Container>*/}
    <Container cls={styles.list}>
        <h3 className={styles.title}>Индивидуальные и парные</h3>
        {listItems.usual.map(it => (
            <ListItem {...it} key={Math.random()} />
        ))}
        <h3 className={styles.title}>Свадебные</h3>
        {listItems.weddings.map(it => (
            <ListItem {...it} key={Math.random()} />
        ))}
    </Container>
    <Container style={{ marginBottom: '1rem' }} cls={styles.conditions}>
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
                    {(paragraph => {
                        const index = paragraph.indexOf('{studios}');
                        if (index < 0) return paragraph;

                        return <>
                            {paragraph.slice(0, index)}
                            <a href="/extra/studios/" target="_blank" rel="noreferrer"
                               style={{ textDecoration: 'underline' }}>
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
