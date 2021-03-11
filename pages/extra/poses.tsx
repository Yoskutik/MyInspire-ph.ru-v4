import React, { FC } from 'react';
import { Breadcrumbs, Container, MainLayout } from '@components';
import styles from '@sass/pages/extra/Poses.module.scss';

interface PoseProps {
    imgSrc: string;
    title: string;
}

const Pose: FC<PoseProps> = ({ imgSrc, title, children }) => (
    <div className={styles.pose}>
        <img className={styles.pose__img} src={imgSrc} alt={title} />
        <h3 className={styles.pose__title}>{title}</h3>
        <p className={styles.pose__text}>
            {children}
        </p>
    </div>
);

export default function ExtraPosesPage(): JSX.Element {
    return (
        <MainLayout title="Шпаргалка по позированию" robots={false}>
            <Breadcrumbs/>
            <Container>
                <Pose imgSrc="/photos/extra/poses/0.jpg" title="Позирование стоя">
                    Взаимодействуйте с окружением, не бойтесь опираться, трогать то что вас окружает, аналогично с
                    одеждой, засовывайте руки в карманы, мните платье, поправляйте жакет.
                    <br />
                    Тело лучше расслабить , опереться на одну ногу, вторую немного согнуть.
                </Pose>
                <Pose imgSrc="/photos/extra/poses/1.jpg" title="Позирование на стуле">
                    Расслабьтесь. Нам, конечно, могут понадобиться статичные позы, но зачастую они ни к чему. Держать
                    ровно спину вовсе не обязательно, ноги можно поставить на разные уровни (то есть одну немного
                    согнуть, другую согнуть побольше или наоборот). Взаимодействуйте со стулом: опирайтесь на него
                    руками, ставьте ноги на проножки.
                </Pose>
                <Pose imgSrc="/photos/extra/poses/2.jpg" title="Позирование на полу">
                    Не бойтесь сгибать колени, хвататься за них руками или облокачиваться руками на пол. Чем Вам удобнее
                    и комфортнее будет - тем лучше.
                </Pose>
                <Pose imgSrc="/photos/extra/poses/3.jpg" title="Портретное позирование">
                    Не бойтесь взаимодействовать с руками и в одеждой. Давить улыбку совсем не обязательно. Если Вам не
                    хочется улыбаться, то не нужно.
                </Pose>
            </Container>
        </MainLayout>
    );
}
