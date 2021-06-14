/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const os = require('os');
const fs = require('fs');
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');
const withPreact = require('next-plugin-preact');

module.exports = phase => {
    const telegramBotToken = fs.readFileSync(path.resolve(os.homedir(), 'telegram', 'token.txt'), 'utf-8');

    return withPreact({
        trailingSlash: true,
        images: {
            domain: ['localhost'],
        },
        publicRuntimeConfig: {
            dev: phase === PHASE_DEVELOPMENT_SERVER,
        },
        serverRuntimeConfig: {
            rootDir: __dirname.replace(/\\/g, '/'),
            telegram: {
                token: telegramBotToken,
                usersFile: path.resolve(os.homedir(), 'telegram', 'users.json'),
            },
        },
        future: {
            webpack5: true,
        },
    });
};
