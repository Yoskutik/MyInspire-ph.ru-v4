/* eslint-disable */
const SitemapPlugin = require('sitemap-webpack-plugin').default;
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const imagemin = require('imagemin');
const imageminWebp = require('imagemin-webp');
const glob = require('glob');
const fs = require('fs');
const path = require('path');

module.exports = async () => {
    console.log('Starting pre building process');
    const pages = glob.sync('./pages/**/*')
        .map(it => it
            .replace(/index\.tsx$/, '')
            .replace(/\.tsx$/, '')
            .replace('./pages', '')
            .replace(/\/?(\w$)/, '$1/')
        )
        .filter(it => !['/_app/', '/_document/', '/404/'].includes(it))
        .filter(it => !it.startsWith('/api/'))
        .filter(it => !it.includes('[') && !it.includes(']'))
        .filter((value, index, self) => self.indexOf(value) === index);
    console.log(`Found ${pages.length} pages total.`);

    const files = await imagemin(['public/photos/**/*.jpg'], {
        plugins: [ imageminWebp({ quality: 85 }) ],
    });
    console.log(`${files.length} JPG images are compiled into WEBP format.`);
    files.forEach(file => {
        fs.writeFileSync(`${file.sourcePath}.webp`, file.data, { flag: 'w' });
    });

    fs.rmdirSync(`${__dirname}/.next`, { recursive: true });

    return {
        entry: {},
        mode: 'production',
        stats: 'errors-only',
        output: {
            path: path.resolve(__dirname, 'public'),
            publicPath: '/',
        },
        plugins: [
            new FaviconsWebpackPlugin({
                logo: './public/favicon.svg',
                outputPath: './favicons',
                inject: false,
                favicons: {
                    icons: {
                        appleStartup: false,
                        coast: false,
                        windows: false,
                        yandex: false,
                        firefox: false,
                    },
                },
            }),
            new SitemapPlugin({
                base: 'https://myinspire-ph.ru',
                paths: pages.filter(path => !path.includes('/extra/')).map(path => ({
                    path,
                    priority: 0.8 ** (path.split('/').length - 2),
                    changefreq: 'monthly',
                })).sort(),
                options: {
                    changefreq: 'monthly',
                    skipgzip: true,
                    lastmod: true,
                },
            }),
        ],
    };
};
