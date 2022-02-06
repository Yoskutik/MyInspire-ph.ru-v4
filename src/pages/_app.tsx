import React from 'react';
import '@sass/Style.scss';

export default function App({ Component, pageProps }): JSX.Element {
    return <Component {...pageProps} />;
}
