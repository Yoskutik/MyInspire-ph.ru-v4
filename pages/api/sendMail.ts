import { NextApiRequest, NextApiResponse } from 'next';
import { NotificationBot } from '@utils/NotificationBot';

const bot = new NotificationBot();

export default function sendMail(req: NextApiRequest, res: NextApiResponse): void {
    bot.sendToAll('message')
        .then(() => res.status(200).json({}))
        .catch(() => res.status(410).json({}));
}
