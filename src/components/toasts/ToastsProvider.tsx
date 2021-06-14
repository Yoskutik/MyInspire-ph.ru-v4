import React, {
    FC, memo, useCallback, useMemo, useState,
} from 'react';
import { generateId } from '@utils';
import { IToast, IToastHTML, ToastContext } from './ToastContext';
import { AnimatedToast } from './Toast';

export const ToastsProvider: FC = memo(({ children }) => {
    const [state, updateState] = useState({
        toasts: [] as IToast[],
        toastsHTML: [] as IToastHTML[],
        deletedIds: new Set<string>(),
    });

    const makeToast = useCallback((toast: Partial<IToast>) => {
        toast.id = generateId('toast');
        toast.date = new Date();
        updateState(({ toasts, ...args }) => ({ toasts: [toast as IToast, ...toasts], ...args }));
    }, []);

    const addToastHTML = useCallback((toast: IToastHTML) => {
        updateState(({ toastsHTML, ...args }) => ({ toastsHTML: [toast, ...toastsHTML], ...args }));
    }, []);

    const getBottomPositionById = useCallback((id: string) => {
        let bottom = 0;
        for (const toast of state.toastsHTML.filter(it => !state.deletedIds.has(it.id))) {
            bottom += toast.height + 10;
            if (toast.id === id) break;
        }
        return bottom;
    }, [state.toastsHTML, state.deletedIds]);

    const startRemovingToast = useCallback((id: string) => {
        updateState(({ deletedIds, ...args }) => ({ deletedIds: new Set([id, ...deletedIds]), ...args }));
    }, []);

    const endUpRemovingToast = useCallback((id: string) => {
        updateState(({ toasts, toastsHTML, deletedIds }) => {
            deletedIds.delete(id);
            return {
                toasts: toasts.filter(it => it.id !== id),
                toastsHTML: toastsHTML.filter(it => it.id !== id),
                deletedIds: new Set(deletedIds),
            };
        });
    }, []);

    const value = useMemo(() => ({
        toasts: state.toasts,
        toastsHTML: state.toastsHTML,
        deletedIds: state.deletedIds,
        addToastHTML,
        getBottomPositionById,
        startRemovingToast,
        endUpRemovingToast,
        makeToast,
    }), [state]);

    return (
        <ToastContext.Provider value={value}>
            {children}
            {state.toasts.map(it => (
                <AnimatedToast data={it} key={it.id} delay={3000}/>
            ))}
        </ToastContext.Provider>
    );
});
