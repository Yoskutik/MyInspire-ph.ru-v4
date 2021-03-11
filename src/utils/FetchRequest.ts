type TMethod = 'POST' | 'GET' | 'DELETE';

interface FetchRequestProps {
    url: string;
    method?: TMethod;
    params?: Record<string, any>;
}

export class FetchRequest {
    private readonly url: string;

    private readonly method: TMethod;

    private readonly body: string;

    constructor({ url, method = 'POST', params = {} }: FetchRequestProps) {
        this.url = `/api${url}`;
        this.method = method;
        this.body = JSON.stringify(params);
    }

    request = (): Promise<any> => fetch(`http://localhost:3000${this.url}`, {
        method: this.method,
        body: this.body,
    }).then(it => it.json());
}
