import { Preset } from 'unified';
import { getSlug } from './getSlug.js';
import { getTocData, MetamarkTocItem } from './getTocData.js';
declare function getFrontmatter(rawMd: string): {
    [key: string]: any;
};
declare function getFirstParagraphText(md: string): string;
declare function toHtml(md: string, preset: Preset): string;
declare function getTitle(filePath: string): string;
declare function getRawMd(filePath: string): string;
declare function getMdNoFrontmatter(rawMd: string): string;
declare function all(filePath: string, pageAllowSet: Set<string>): {
    title: string;
    slug: string;
    toc: MetamarkTocItem[];
    firstParagraphText: string;
    frontmatter: {
        [key: string]: any;
    };
    html: string;
};
export declare const Metamark: {
    all: typeof all;
    getFirstParagraphText: typeof getFirstParagraphText;
    getFrontmatter: typeof getFrontmatter;
    getMdNoFrontmatter: typeof getMdNoFrontmatter;
    getRawMd: typeof getRawMd;
    getSlug: typeof getSlug;
    getTitle: typeof getTitle;
    getTocData: typeof getTocData;
    preset: Preset;
    presetBuilder: ({ toLink }: {
        toLink: any;
    }) => Preset;
    toHtml: typeof toHtml;
};
export {};
