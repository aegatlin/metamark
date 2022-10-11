import { Preset } from 'unified';
import { getSlug } from './getSlug.js';
import { getTocData, MetamarkTocItem } from './getTocData.js';
declare function getFrontmatter(rawMd: string): {
    [key: string]: any;
};
declare function getFirstParagraphText(md: string): string;
declare function toHtml(md: string, preset: Preset): string;
declare function getPage(filePath: string): string;
declare function getRawMd(filePath: string): string;
declare function getMdNoFrontmatter(rawMd: string): string;
export interface Mark {
    page: string;
    slug: string;
    toc: MetamarkTocItem[];
    firstParagraphText: string;
    frontmatter: {
        [key: string]: any;
    };
    html: string;
}
declare function getMark(filePath: string, pageAllowSet: Set<string>): Mark;
declare function getMarks(filePathList: string[], pageAllowSet: Set<string>): Mark[];
export declare const Metamark: {
    getFirstParagraphText: typeof getFirstParagraphText;
    getFrontmatter: typeof getFrontmatter;
    getMark: typeof getMark;
    getMarks: typeof getMarks;
    getMdNoFrontmatter: typeof getMdNoFrontmatter;
    getRawMd: typeof getRawMd;
    getSlug: typeof getSlug;
    getPage: typeof getPage;
    getTocData: typeof getTocData;
    preset: Preset;
    presetBuilder: ({ toLink }: {
        toLink: any;
    }) => Preset;
    toHtml: typeof toHtml;
};
export {};
