import fs from 'fs';
import getConfig from 'next/config';
import glob from 'glob';

const { serverRuntimeConfig } = getConfig();
const { rootDir } = serverRuntimeConfig;

const pathsMap: Record<string, string[]> = {};
export const getPhotos = (path: string): string[] => {
    if (path in pathsMap) return pathsMap[path];

    const newPaths = glob.sync(`${rootDir}/public/photos${path}**/*.jpg`)
        .map(it => it.replace(`${rootDir}/public/photos${path}`, '').replace(/\.jpg$/i, ''));
    pathsMap[path] = newPaths;
    return newPaths;
};

if (!fs.existsSync(`${rootDir}/statistics`)) {
    fs.mkdirSync(`${rootDir}/statistics`);
}

const postVisitorsPath = `${rootDir}/statistics/postVisitors.json`;
let postVisitors: Record<string, number>;
try {
    postVisitors = JSON.parse(fs.readdirSync(postVisitorsPath, 'utf-8').join(''));
} catch {
    postVisitors = {};
}

setInterval(() => {
    try {
        fs.writeFileSync(postVisitorsPath, JSON.stringify(postVisitors), { encoding: 'utf-8' });
    } catch { /* */ }
}, 5 * 60 * 1000);

export const addPostVisitor = (title: string): void => {
    if (title in postVisitors) {
        postVisitors[title]++;
    } else {
        postVisitors[title] = 1;
    }
};
