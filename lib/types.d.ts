export interface Metadata {
    createdAt: Date;
    updatedAt: Date;
    slug: string;
}
export interface Metamark {
    metadata: Metadata;
    md: string;
    html: string;
    toc?: Toc;
}
export interface TocItem {
    title: string;
    url: string;
    children?: TocItem[];
}
export declare type Toc = TocItem[];
