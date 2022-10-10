import { WikiLink } from 'remark-obsidian-link';
export declare enum ObsidianLinkType {
    Page = "page",
    PageHeader = "page-header",
    PageBlock = "page-block",
    Header = "header",
    Block = "block"
}
interface Aliasable {
    alias?: string;
}
interface Pageable {
    page: string;
}
interface Headerable {
    header: string;
}
interface Blockable {
    block: string;
}
interface Page extends Aliasable, Pageable {
    type: ObsidianLinkType.Page;
}
interface PageHeader extends Aliasable, Pageable, Headerable {
    type: ObsidianLinkType.PageHeader;
}
interface PageBlock extends Aliasable, Pageable, Blockable {
    type: ObsidianLinkType.PageBlock;
}
interface Header extends Aliasable, Headerable {
    type: ObsidianLinkType.Header;
}
interface Block extends Aliasable, Blockable {
    type: ObsidianLinkType.Block;
}
export declare type ObsidianLink = Page | PageHeader | PageBlock | Header | Block;
export declare function obsidianLinkBuilder(wikiLink: WikiLink | string): ObsidianLink;
export {};
