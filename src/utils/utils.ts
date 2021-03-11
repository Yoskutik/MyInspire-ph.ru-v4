const keywords: string[] = [
    'Фотограф Санкт-Петербург',
    'Мельникова Татьяна',
    'Фотограф СПб',
    'Фотосессия СПб',
    'Портрет',
    'Love story',
    'Съёмка в Санкт-Петербурге',
];

export const createKeywordGenerator = function* (): Generator<string, string> {
    let previousKeyword = '';
    while (true) {
        let keyword;
        while (!keyword || keyword === previousKeyword) {
            keyword = keywords[Math.floor(Math.random() * keywords.length)];
        }
        previousKeyword = keyword;
        yield keyword;
    }
};

export const debounce = function (cb: (...args: any[]) => any, ms = 100): (...args: any[]) => any {
    let isCoolDown = false;
    return function (...args) {
        if (isCoolDown) return;
        cb.apply(this, args);
        isCoolDown = true;
        setTimeout(() => {
            isCoolDown = false;
        }, ms);
    };
};

export const copyToClipboard = (str: string): void => {
    const el = document.createElement('textarea');
    el.value = str;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
};

export const sleep = (ms: number): Promise<void> => new Promise(res => setTimeout(res, ms));

export const createDate = (day: number, month: number, year: number): Date => {
    const date = new Date();

    date.setDate(day);
    date.setMonth(month - 1);
    date.setFullYear(year);

    date.setHours(23);
    date.setMinutes(59);
    date.setSeconds(59);

    return date;
};

export const $ = <T extends Element = HTMLElement>(selector: string): T => document.querySelector<T>(selector);
export const $$ = <T extends Element = HTMLElement>(selector: string): T[] => Array.from(
    document.querySelectorAll<T>(selector),
);

export const isElementVisible = (node: Element, gap = 150): boolean => {
    const rect = node.getBoundingClientRect();
    const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
    return !(rect.bottom < gap || rect.top - viewHeight >= -gap);
};
