import React, { FC, useState } from 'react';
import { $, debounce, useEventListener } from '@utils';
import headerStyles from '@sass/mainLayout/Header.module.scss';
import collageStyles from '@sass/pages/home/Collage.module.scss';
import { Genres } from './Genres';
import { Collage } from './Collage';
import { Info } from './Info';

export interface HomeProps {
    isMobile: boolean;
    photos: {
        vertical: string[];
        horizontal: string[];
    };
}

export const Home: FC<HomeProps> = ({ isMobile, photos }) => {
    const [infoMargin, setInfoMargin] = useState(0);

    useEventListener(globalThis, 'resize', debounce(() => {
        const imgBottom = $(`.${collageStyles.img}`).getBoundingClientRect().height;
        const headerBottom = $(`.${headerStyles.header}`).getBoundingClientRect().height;
        setInfoMargin(imgBottom - headerBottom);
    }, 5));

    return <>
        <Collage isMobile={isMobile} photos={photos} arrowTop={infoMargin}/>
        <Info marginTop={infoMargin}/>
        <Genres/>
    </>;
};
