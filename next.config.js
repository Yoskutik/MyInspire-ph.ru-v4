const path = require('path');
const os = require('os');
const fs = require('fs');
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

module.exports = phase => {
    const telegramBotToken = fs.readFileSync(path.resolve(os.homedir(), 'telegram', 'token.txt'));

    return {
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
    };
};
