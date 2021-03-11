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
