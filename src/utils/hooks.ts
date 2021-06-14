import { useCallback, useEffect, useState } from 'react';
import { $ } from './utils';

export const useEventListener = (
    target: EventTarget | string, event: string, listener: EventListenerOrEventListenerObject, trigger = true,
): void => {
    useEffect(() => {
        const newTarget = typeof target === 'string' ? $(target) : target;
        newTarget.addEventListener(event, listener);
        trigger && newTarget.dispatchEvent(new Event(event));
        return () => newTarget.removeEventListener(event, listener);
    });
};

export const useBooleanState = (value?: boolean): [boolean, () => void, () => void] => {
    const [state, setState] = useState(value);
    const enable = useCallback(() => setState(true), []);
    const disable = useCallback(() => setState(false), []);
    return [state, enable, disable];
};
