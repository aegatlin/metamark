import { Preset } from 'unified';

declare function getSlug(s: string): string;

interface MetamarkTocItem {
    title: string;
    depth: number;
    id: string;
}
declare function getTocData(html: string): MetamarkTocItem[];

declare type GetPageUri = (page: string, toSlug: (s: string) => string) => {
    uri: string;
    slug: string;
};
declare type GetPageUriBuilder = (x: {
    frontmatter: {
        [key: string]: any;
    };
}) => GetPageUri;

declare function getFrontmatter(rawMd: string): {
    [key: string]: any;
};
declare function getFirstParagraphText(md: string): string;
declare function toText(md: string): string;
declare function toHtml(md: string, preset: Preset): string;
declare function getPage(filePath: string): string;
declare function getRawMd(filePath: string): string;
declare function getMdNoFrontmatter(rawMd: string): string;
interface GetMarksOptions {
    getPageUriBuilder?: GetPageUriBuilder;
}
interface Mark {
    page: string;
    slug: string;
    toc: MetamarkTocItem[];
    firstParagraphText: string;
    frontmatter: {
        [key: string]: any;
    };
    html: string;
    text: string;
}
declare function getMark(filePath: string, pageAllowSet: Set<string>, options?: GetMarksOptions): Mark;
declare function getMarks(filePathList: string[], pageAllowSet: Set<string>, options?: GetMarksOptions): Mark[];
declare const Metamark: {
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
    toText: typeof toText;
};

export { GetMarksOptions, Mark, Metamark, MetamarkTocItem };
