import { WikiLink, Link } from 'remark-obsidian-link';
export declare type ToLink = (wikiLink: WikiLink) => Link | string;
export declare function toLinkBuilder(pageAllowSet: Set<string>): ToLink;
