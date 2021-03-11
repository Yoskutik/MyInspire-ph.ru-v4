import React from 'react';
import '../src/sass/Style.scss';

export default function App({ Component, pageProps }): JSX.Element {
    return <Component {...pageProps} />;
}
