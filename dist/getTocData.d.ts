export interface MetamarkTocItem {
    title: string;
    depth: number;
    id: string;
}
export declare function getTocData(html: string): MetamarkTocItem[];
