interface TocItem {
    title: string;
    depth: number;
    id: string;
}
interface Metamark {
    slug: string;
    route: string;
    toc: TocItem[];
    firstParagraphText: string;
    title: string;
    frontmatter: any;
    content: {
        html: string;
    };
}
export declare function metamark(filePath: string): Metamark;
export {};
