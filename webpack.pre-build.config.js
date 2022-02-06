/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');
const SitemapPlugin = require('sitemap-webpack-plugin').default;
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const imagemin = require('imagemin');
const imageminWebp = require('imagemin-webp');
const glob = require('glob');
const colors = require('colors');
const { Bar, Presets } = require('cli-progress');
const blogs = require('./src/data/blog.json');

module.exports = async () => {
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
    console.log(`${colors.cyan('info')}  - Found ${pages.length} pages total.`);

    const now = new Date();
    const jpgImages = glob.sync('public/photos/**/*.jpg');
    const bar = new Bar({
        hideCursor: true,
        clearOnComplete: true,
    }, Presets.shades_classic);

    console.log(`${colors.cyan('info')}  - Deleting olg WEBP images:`);
    const oldWebpImages = glob.sync('public/photos/**/*.webp');
    bar.start(oldWebpImages.length, 0);
    oldWebpImages.forEach((img, i) => {
        fs.unlinkSync(img);
        bar.update(i + 1);
    });
    bar.stop();

    console.log(`${colors.cyan('info')}  - Converting JPG to WEBP:`);
    bar.start(jpgImages.length, 0);
    for (let i = 0; i < jpgImages.length / 2; i += 2) {
        // eslint-disable-next-line no-await-in-loop
        const photos = [jpgImages[i]];
        i + 2 < jpgImages.length && photos.push(jpgImages[i + 1]);
        const webps = await imagemin(photos, { plugins: [imageminWebp({ quality: 85 })] });
        webps.forEach((webp, j) => {
            fs.writeFileSync(`${webp.sourcePath}.webp`, webp.data, { flag: 'w' });
            bar.update(i + j);
        });
    }
    bar.stop();
    const elapsedTime = (new Date() - now) / 1000;
    const ss = Math.round(elapsedTime % 60).toString().padStart(2, '0');
    const mm = Math.round(elapsedTime / 60).toString().padStart(2, '0');
    console.log(`${colors.cyan('info')}  - ${jpgImages.length} images converted into WEBP format in ${mm}:${ss}`);

    fs.rmdirSync(`${__dirname}/.next`, { recursive: true });

    const sitemapPaths = pages.filter(p => !p.includes('/extra/')).sort().map(p => ({
        path: p,
        priority: 0.8 ** (p.split('/').length - 2),
        changefreq: 'monthly',
    }));
    sitemapPaths.push(...blogs.map(it => ({
        path: `/blog/${it.title.replace(/ /g, '-')}`,
        priority: 0.2,
        lastmod: '2021-03-20T12:00:00.000Z',
        changefreq: 'never',
    })));

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
                paths: sitemapPaths,
                options: {
                    changefreq: 'monthly',
                    skipgzip: true,
                    lastmod: true,
                },
            }),
        ],
    };
};
