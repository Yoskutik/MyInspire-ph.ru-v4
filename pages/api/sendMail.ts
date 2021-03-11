import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import { NotificationBot } from '@utils/NotificationBot';

const transporter = nodemailer.createTransport({
    host: 'smtp.timeweb.ru',
    port: 25,
    secure: false,
    auth: {
        user: '',
        pass: '',
    },
});

const bot = new NotificationBot('459375635:AAFUh43EyzLXpQX5IqwPqcp57KNFAmIVEK8');

export default function sendMail(req: NextApiRequest, res: NextApiResponse): void {
    transporter.sendMail({
        from: '"Татьяна 👻" <tatiana@myinspire-ph.ru>',
        to: 'yoskutik@gmail.com',
        subject: 'Hello ✔',
        text: 'Hello world?',
        html: '<b>Hello world?</b>',
    })
        .then(() => {
            res.status(200).json({});
            bot.sendToAll('message');
        })
        .catch(() => res.status(401).json({}));
}
