export const linearTween = (t: number): number => t;

export const easeInQuad = (t: number): number => t * t;

export const easeOutQuad = (t: number): number => -t * (t - 2);

export const easeInOutQuad = (t: number): number => {
    t /= 0.5;
    if (t < 1) return t * t / 2;
    t--;
    return (t * (t - 2) - 1) / 2;
};

export const easeInCuaic = (t: number): number => t ** 3;

export const easeOutCuaic = (t: number): number => (t - 1) ** 3 + 1;

export const easeInOutCuaic = (t: number): number => {
    t /= 0.5;
    if (t < 1) return t * t * t / 2;
    t -= 2;
    return (t * t * t + 2) / 2;
};

export const scrollTo = (element: HTMLElement, to: number, {
    duration = 500,
    step = 5,
    motion = easeOutCuaic,
    direction = 'vertical' as 'vertical' | 'horizontal',
} = {}): void => {
    const scrollPositionName = direction === 'vertical' ? 'scrollTop' : 'scrollLeft';
    const from = element[scrollPositionName];
    const speed = 1 / duration;

    const func = (t0: number) => {
        if (t0 < 0 || t0 > 1 || speed <= 0) {
            element[scrollPositionName] = to;
            return;
        }

        element[scrollPositionName] = from - (from - to) * motion(t0);
        const t1 = t0 + speed * step;

        setTimeout(() => func(t1), step);
    };

    func(0);
};
