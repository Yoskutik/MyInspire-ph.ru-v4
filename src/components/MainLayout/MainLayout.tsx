import React, {
    createContext, FC, ReactNode, useEffect, useState,
} from 'react';
import Head from 'next/head';
import Router from 'next/router';
import { Spinner } from '../Spinner';
import { Header } from './Header';
import { Footer } from './Footer';

interface MainLayoutProps {
    title: string;
    description?: string;
    keywords?: string;
    children: ReactNode | ReactNode[];
    robots?: boolean;
    canonical?: string;
    customSpinnerRemove?: boolean;
}

interface IMainLayoutContext {
    isSpinnerVisible: boolean;
    setSpinnerVisible: (value: boolean) => void;
}

export const MainLayoutContext = createContext<IMainLayoutContext>(null);

export const MainLayout: FC<MainLayoutProps> = ({
    title, description, keywords, children, robots = true, canonical, customSpinnerRemove,
}) => {
    const [isSpinnerVisible, setSpinnerVisible] = useState(true);

    useEffect(() => {
        !customSpinnerRemove && setSpinnerVisible(false);
        const showSpinner = () => setSpinnerVisible(true);
        const hideSpinner = () => setSpinnerVisible(false);

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
        <MainLayoutContext.Provider value={{ isSpinnerVisible, setSpinnerVisible }}>
            {isSpinnerVisible && <Spinner size={96}/>}
            <div className={`page ${isSpinnerVisible ? 'page--loading' : ''}`}>
                {children}
            </div>
        </MainLayoutContext.Provider>
        <div style={{ flex: 1 }}/>
        <Footer/>
    </>;
};
