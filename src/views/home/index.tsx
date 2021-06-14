import React, { FC, useCallback, useContext, useState } from 'react';
import { $, debounce, useEventListener } from '@utils';
import { MainLayoutContext } from '@components';
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
    const { setSpinnerVisible } = useContext(MainLayoutContext);

    const onLoad = useCallback(() => {
        window.dispatchEvent(new Event('resize'));
        setSpinnerVisible(false);
    }, []);

    useEventListener(globalThis, 'resize', debounce(() => {
        const headerBottom = $(`.${headerStyles.header}`).getBoundingClientRect().height;
        setInfoMargin((window.innerWidth / size[0]) * size[1] - headerBottom);
    }, 5));

    return <>
        <Collage isMobile={isMobile} photos={photos} arrowTop={infoMargin} onFirstImageLoad={onLoad}/>
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
