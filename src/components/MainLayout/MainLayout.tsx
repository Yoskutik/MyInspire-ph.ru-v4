import React, { FC, ReactNode, useEffect, useState } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import { Spinner } from '@components';
import { Header } from './Header';
import { Footer } from './Footer';
import { useBooleanState } from '@utils';

interface MainLayoutProps {
    title: string;
    description?: string;
    keywords?: string;
    children: ReactNode | ReactNode[];
    robots?: boolean;
    canonical?: string;
}

const styleFlex = { flex: 1 };

export const MainLayout: FC<MainLayoutProps> = ({
    title, description, keywords, children, robots = true, canonical,
}) => {
    const [isSpinnerVisible, showSpinner, hideSpinner] = useBooleanState();

    useEffect(() => {
        Router.events.on('routeChangeStart', showSpinner);
        Router.events.on('routeChangeComplete', hideSpinner);
        return () => {
            Router.events.off('routeChangeStart', showSpinner);
            Router.events.off('routeChangeComplete', hideSpinner);
        };
    }, []);

    return <>
        <Head>
            <title>{title}</title>
            <meta name="robots" content={robots ? 'all' : 'none'}/>
            {description && <meta name="description" content={description}/>}
            {keywords && <meta name="keywords" content={keywords}/>}
            {canonical && <link rel="canonical" href={`https://MyInspire-ph.ru${canonical}`}/>}

            <meta property="og:title" content={title}/>
            <meta property="og:description" content={description}/>
            <meta property="og:image" content="https://myinspire-ph.ru/photos/og/0.jpg"/>
            <meta property="og:image:type" content="image/jpg" />
            <meta property="og:image:width" content="1528" />
            <meta property="og:image:height" content="800" />
            <meta property="og:type" content="website"/>
            <meta property="og:url" content="https://myinspire-ph.ru/"/>
            <meta property="og:locale" content="ru_RU"/>

            <meta name="twitter:card" content="summary"/>
            <meta name="twitter:creator" content="@myinspire_ph"/>
            <meta name="twitter:title" content={title}/>
            <meta name="twitter:description" content={description}/>
            <meta name="twitter:image" content="https://myinspire-ph.ru/photos/ava.jpg"/>
            <meta name="twitter:url" content="https://myinspire-ph.ru/"/>
        </Head>
        <Header/>
        {isSpinnerVisible ? (
            <Spinner className="page__loading-spinner" size={96}/>
        ) : (
            <main className="page">
                {children}
            </main>
        )}
        <div style={styleFlex}/>
        <Footer/>
    </>;
};
