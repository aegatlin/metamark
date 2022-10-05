export interface MetamarkTocItem {
    title: string;
    depth: number;
    id: string;
}
export interface Metamark {
    slug: string;
    route: string;
    toc: MetamarkTocItem[];
    firstParagraphText: string;
    title: string;
    frontmatter: any;
    content: {
        html: string;
    };
}
declare type Opts = {
    toSlug?: (title: string) => string;
    toRoute?: (title: string) => string;
};
export declare function metamark(filePath: string, { toSlug, toRoute }?: Opts): Metamark;
export {};
