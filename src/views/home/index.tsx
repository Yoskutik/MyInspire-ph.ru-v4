import React, { FC, useState } from 'react';
import { $, debounce, useEventListener } from '@utils';
import headerStyles from '@sass/mainLayout/Header.module.scss';
import { Genres } from './Genres';
import { Collage } from './Collage';
import { Info } from './Info';

export interface HomeProps {
    isMobile: boolean;
    photos: string[];
    size: [number, number];
}

export const Home: FC<HomeProps> = ({ isMobile, photos, size }) => {
    const [infoMargin, setInfoMargin] = useState<number>();

    useEventListener(globalThis, 'resize', debounce(() => {
        const headerBottom = $(`.${headerStyles.header}`).getBoundingClientRect().height;
        setInfoMargin((window.innerWidth / size[0]) * size[1] - headerBottom);
    }, 5));

    return <>
        <Collage isMobile={isMobile} photos={photos} arrowTop={infoMargin}/>
        <Info marginTop={infoMargin}/>
        <Genres/>
        <style jsx global>{`
            a {
                cursor: pointer;
                text-decoration: underline;
            }
            
            a:hover {
                opacity: 0.7;
            }
        `}</style>
    </>;
};
