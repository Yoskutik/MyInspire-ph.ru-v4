import React, { CSSProperties, FC } from 'react';
import { Container, MainLayout } from '@components';

const style: CSSProperties = {
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
};

const Page404: FC = () => (
    <MainLayout title="Страница не найдена" robots={false}>
        <Container style={style}>
            <h1>Упс!</h1>
            <h3>Кажется, необходимый Вам файл отсутствует.</h3>
        </Container>
        <style jsx global>{`
            .page {
                height: 100%;
            }
        `}</style>
    </MainLayout>
);

export default Page404;
