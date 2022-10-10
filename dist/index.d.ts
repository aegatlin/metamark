import { Preset } from 'unified';
export interface MetamarkTocItem {
    title: string;
    depth: number;
    id: string;
}
declare function getFrontmatter(rawMd: string): {
    [key: string]: any;
};
declare function getFirstParagraphText(md: string): string;
declare function getTocData(html: string): MetamarkTocItem[];
declare function toHtml(md: string): string;
declare function toTitle(filePath: string): string;
declare function toSlug(title: string): string;
declare function getRawMd(filePath: string): string;
declare function getMdNoFrontmatter(rawMd: string): string;
declare function all(filePath: string): {
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
    preset: Preset;
    getRawMd: typeof getRawMd;
    getMdNoFrontmatter: typeof getMdNoFrontmatter;
    getTocData: typeof getTocData;
    getFirstParagraphText: typeof getFirstParagraphText;
    getFrontmatter: typeof getFrontmatter;
    toHtml: typeof toHtml;
    toTitle: typeof toTitle;
    toSlug: typeof toSlug;
    all: typeof all;
};
export {};
