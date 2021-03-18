/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');
const SitemapPlugin = require('sitemap-webpack-plugin').default;
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const imagemin = require('imagemin');
const imageminWebp = require('imagemin-webp');
const glob = require('glob');
const { Bar, Presets } = require('cli-progress');

module.exports = async () => {
    console.log('Starting pre building process.');
    const pages = glob.sync('./pages/**/*')
        .map(it => it
            .replace(/index\.tsx$/, '')
            .replace(/\.tsx$/, '')
            .replace('./pages', '')
            .replace(/\/?(\w$)/, '$1/'))
        .filter(it => !['/_app/', '/_document/', '/404/'].includes(it))
        .filter(it => !it.startsWith('/api/'))
        .filter(it => !it.includes('[') && !it.includes(']'))
        .filter((value, index, self) => self.indexOf(value) === index);
    console.log(`Found ${pages.length} pages total.`);

    const jpgImages = glob.sync('public/photos/**/*.jpg');
    const bar = new Bar({}, Presets.shades_classic);

    console.log('Converting JPG to WEBP:');
    bar.start(jpgImages.length, 1);
    for (let i = 0; i < jpgImages.length; i++) {
        // eslint-disable-next-line no-await-in-loop
        const webp = (await imagemin([jpgImages[i]], { plugins: [imageminWebp({ quality: 85 })] }))[0];
        fs.writeFileSync(`${webp.sourcePath}.webp`, webp.data, { flag: 'w' });
        bar.update(i);
    }
    bar.stop();

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
                paths: pages.filter(p => !p.includes('/extra/')).map(p => ({
                    path: p,
                    priority: 0.8 ** (p.split('/').length - 2),
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
