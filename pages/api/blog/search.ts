import { NextApiRequest, NextApiResponse } from 'next';
import natural from 'natural';
import blog from '@data/blog.json';

const data: Record<string, string> = {};
blog.forEach(it => {
    data[it.title] = natural.PorterStemmerRu.stem(it.title + JSON.stringify(it.keywords) + JSON.stringify(it.body));
});

export default function search(req: NextApiRequest, res: NextApiResponse): void {
    if (req.method !== 'POST') {
        res.status(401).send({ message: 'Wrong request' });
        return;
    }
    const body = JSON.parse(req.body);
    if (!body.query && !body.keyword) {
        res.status(401).send({ message: 'Request params does not respond API schema' });
        return;
    }
    if (body.query) {
        const query = natural.PorterStemmerRu.stem(body.query.toLowerCase());
        const response: string[] = [];
        Object.entries(data).forEach(([key, value]) => {
            if (value.includes(query)) response.push(key);
        });
        res.status(200).json(response);
        return;
    }
    if (body.keyword) {
        const response: string[] = [];
        blog.forEach(it => {
            if (it.keywords.includes(body.keyword)) response.push(it.title);
        });
        res.status(200).json(response);
    }
}
