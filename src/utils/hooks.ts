import { useCallback, useEffect, useState } from 'react';

export const useEventListener = (
    target: EventTarget, event: string, listener: EventListenerOrEventListenerObject, trigger = true,
): void => {
    useEffect(() => {
        target.addEventListener(event, listener);
        trigger && target.dispatchEvent(new Event(event));
        return () => target.removeEventListener(event, listener);
    });
};

export const useBooleanState = (value?: boolean): [boolean, () => void, () => void] => {
    const [state, setState] = useState(value);
    const enable = useCallback(() => setState(true), []);
    const disable = useCallback(() => setState(false), []);
    return [state, enable, disable];
};
