import React, {
    CSSProperties, FC, forwardRef, memo, useContext, useEffect, useMemo, useRef, useState,
} from 'react';
import styles from '@sass/components/Toast.module.scss';
import { CloseButton } from '../CloseButton';
import { IToast, ToastContext } from './ToastContext';

interface ToastProps {
    data: IToast;
    onClose?: () => void;
    style?: CSSProperties;
}

export const Toast = memo(forwardRef<HTMLDivElement, ToastProps>(({ data, onClose, style }, ref) => (
    <div className={styles.toast} id={data.id} ref={ref} style={style}>
        {data.type && <div className={`${styles.marker} ${styles[data.type]}`}/>}
        {data.title && <div className={styles.title}>{data.title}</div>}
        {data.body}
        <CloseButton onClick={onClose} cls={styles.close}/>
        <span className={styles.time}>{data.date.toLocaleTimeString().slice(0, 5)}</span>
    </div>
)));

export const AnimatedToast: FC<ToastProps & { delay?: number }> = ({ data, delay }) => {
    const [top, setTop] = useState(-10);
    const [opacity, setOpacity] = useState(0);
    const ref = useRef<HTMLDivElement>();
    const timeout = useRef<any>();
    const context = useContext(ToastContext);
    const position: CSSProperties = useMemo(() => ({
        opacity, top: `calc(100% - ${top}px)`, position: 'fixed',
    }), [top, opacity]);

    useEffect(() => {
        const { width, height } = ref.current.getBoundingClientRect();
        context.addToastHTML({ id: data.id, width, height });
        setOpacity(1);
        delay && (timeout.current = setTimeout(() => context.startRemovingToast(data.id), delay));
    }, []);

    useEffect(() => {
        if (context.deletedIds.has(data.id)) {
            setTop(-10);
            ref.current.addEventListener('transitionend', () => context.endUpRemovingToast(data.id));
            return;
        }
        setTop(context.getBottomPositionById(data.id));
    }, [context.deletedIds, context.toasts, context.toastsHTML]);

    const onCloseClick = () => {
        clearTimeout(timeout.current);
        context.startRemovingToast(data.id);
    };

    return (
        <Toast data={data} onClose={onCloseClick} style={position} ref={ref}/>
    );
};
