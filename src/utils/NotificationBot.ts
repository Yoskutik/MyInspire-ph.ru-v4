import fs from 'fs';
import getConfig from 'next/config';
import TelegramBot from 'node-telegram-bot-api';

const { serverRuntimeConfig } = getConfig();

export class NotificationBot extends TelegramBot {
    private readonly userIds: Set<number>;

    constructor() {
        super(serverRuntimeConfig.telegram.token, { polling: true });
        try {
            this.userIds = new Set(JSON.parse(fs.readFileSync(serverRuntimeConfig.telegram.usersFile, 'utf-8')));
        } catch {
            this.userIds = new Set();
        }
        this.on('message', message => {
            if (!this.userIds.has(message.chat.id)) {
                this.userIds.add(message.chat.id);
                fs.writeFileSync(serverRuntimeConfig.telegram.usersFile, JSON.stringify([...this.userIds]), 'utf-8');
            }
        });
    }

    sendToAll = async (message: string): Promise<void> => {
        const userIds = [...this.userIds];
        for (let i = 0; i < userIds.length; i++) {
            this.sendMessage(userIds[i], message);
            // eslint-disable-next-line no-await-in-loop
            await new Promise(resolve => setTimeout(resolve, 35));
        }
    };
}
