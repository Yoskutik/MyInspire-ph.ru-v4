/* eslint-disable */
import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import getConfig from 'next/config';

declare const window: {
    dataLayer: any;
};

export default class MyDocument extends Document {
    render(): JSX.Element {
        const { publicRuntimeConfig } = getConfig();
        return (
            <Html lang="ru">
                <Head>
                    <meta charSet="utf-8"/>
                    <meta httpEquiv="Content-Type" content="text/html; charset=utf-8"/>
                    <meta property="og:title" content="Мельникова Татьяна"/>
                    <meta property="og:description" content="Профессиональный фотограф в Санкт-Петербурге"/>
                    <meta property="og:image" content="https://myinspire-ph.ru/photos/ava-500x500.jpg"/>
                    <meta property="og:image:type" content="image/jpg" />
                    <meta property="og:image:width" content="500" />
                    <meta property="og:image:height" content="500" />
                    <meta property="og:type" content="website"/>
                    <meta property="og:url" content="https://myinspire-ph.ru/"/>
                    <meta property="og:locale" content="ru_RU"/>
                    <link href="/favicon.svg" rel="icon" type="image/svg+xml"/>
                    <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png"/>
                    <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png"/>
                    <link rel="icon" type="image/png" sizes="48x48" href="/favicons/favicon-48x48.png"/>
                    <link rel="manifest" href="/favicons/manifest.json"/>
                    <meta name="mobile-web-app-capable" content="yes"/>
                    <meta name="theme-color" content="#fff"/>
                    <meta name="application-name" content="myinspire-ph.ru"/>
                    <link rel="apple-touch-icon" sizes="57x57" href="/favicons/apple-touch-icon-57x57.png"/>
                    <link rel="apple-touch-icon" sizes="60x60" href="/favicons/apple-touch-icon-60x60.png"/>
                    <link rel="apple-touch-icon" sizes="72x72" href="/favicons/apple-touch-icon-72x72.png"/>
                    <link rel="apple-touch-icon" sizes="76x76" href="/favicons/apple-touch-icon-76x76.png"/>
                    <link rel="apple-touch-icon" sizes="114x114" href="/favicons/apple-touch-icon-114x114.png"/>
                    <link rel="apple-touch-icon" sizes="120x120" href="/favicons/apple-touch-icon-120x120.png"/>
                    <link rel="apple-touch-icon" sizes="144x144" href="/favicons/apple-touch-icon-144x144.png"/>
                    <link rel="apple-touch-icon" sizes="152x152" href="/favicons/apple-touch-icon-152x152.png"/>
                    <link rel="apple-touch-icon" sizes="167x167" href="/favicons/apple-touch-icon-167x167.png"/>
                    <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon-180x180.png"/>
                    <link rel="apple-touch-icon" sizes="1024x1024" href="/favicons/apple-touch-icon-1024x1024.png"/>
                    <meta name="apple-mobile-web-app-capable" content="yes"/>
                    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>
                    <meta name="apple-mobile-web-app-title" content="myinspire-ph.ru"/>
                    {!publicRuntimeConfig.dev && <>
                        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-153171785-1"/>
                        <script dangerouslySetInnerHTML={{ __html: `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'UA-153171785-1');`}}/>
                    </>}
                </Head>
                <body>
                    <Main/>
                    <NextScript/>
                </body>
            </Html>
        );
    }
}
