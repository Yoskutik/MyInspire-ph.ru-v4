type TMethod = 'POST' | 'GET' | 'DELETE';

interface FetchRequestProps {
    url: string;
    method?: TMethod;
    params?: Record<string, any> | FormData;
}

export class FetchRequest {
    private readonly url: string;

    private readonly method: TMethod;

    private readonly body: string;

    private readonly baseUrl: string;

    constructor({ url, method = 'POST', params = {} }: FetchRequestProps) {
        this.baseUrl = typeof window === 'undefined' ? '' : 'http://localhost:3000';
        this.url = `/api${url}`;
        this.method = method;
        if (params instanceof FormData) {
            const tmp = {};
            params.forEach((value, key) => {
                tmp[key] = value;
            });
            this.body = JSON.stringify(tmp);
        } else {
            this.body = JSON.stringify(params);
        }
    }

    request = (): Promise<any> => fetch(`${this.baseUrl}${this.url}`, {
        method: this.method,
        body: this.body,
    }).then(it => it.json());
}
