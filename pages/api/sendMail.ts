import { NextApiRequest, NextApiResponse } from 'next';
import { NotificationBot } from '@utils/NotificationBot';

export default function sendMail(req: NextApiRequest, res: NextApiResponse): void {
    const data = JSON.parse(req.body);
    let message = `Новое сообщение от "${data.name.trim()}":\r\n`;
    data.tel && (message += `тел.: ${data.tel.trim()}\r\n`);
    data.email && (message += `email: ${data.email.trim()}\r\n`);
    message += `\r\n\r\n${data.message.trim()}`;
    new NotificationBot().sendToAll(message)
        .then(() => res.status(200).json({ success: true }))
        .catch(e => res.status(410).json({ success: false, message: e.code }));
}
