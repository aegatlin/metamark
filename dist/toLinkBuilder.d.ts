export interface WikiLink {
    value: string;
    alias?: string;
}
export interface Link {
    value: string;
    uri: string;
    title?: string;
}
export declare type ToLink = (wikiLink: WikiLink) => Link | string;
export declare function toLinkBuilder(pageAllowSet: Set<string>): ToLink;
