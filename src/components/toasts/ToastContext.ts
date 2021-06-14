import { createContext } from 'react';

export interface IToast {
    id: string;
    title?: string;
    body: string;
    date: Date;
    type?: 'error';
}

export interface IToastHTML {
    id: string;
    width: number;
    height: number;
}

interface IToastContext {
    deletedIds: Set<string>;
    toasts: IToast[],
    toastsHTML: IToastHTML[];
    addToastHTML: (toast: IToastHTML) => void;
    getBottomPositionById: (id: string) => number;
    startRemovingToast: (id: string) => void;
    endUpRemovingToast: (id: string) => void;
    makeToast: (toast: Partial<IToast>) => void;
}

export const ToastContext = createContext<IToastContext>(null);
