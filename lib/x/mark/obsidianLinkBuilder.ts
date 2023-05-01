import { WikiLink } from "remark-obsidian-link";

export enum ObsidianLinkType {
  Page = "page",
  PageHeader = "page-header",
  PageBlock = "page-block",
  Header = "header",
  Block = "block",
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

export type ObsidianLink = Page | PageHeader | PageBlock | Header | Block;

const Regex = {
  Alias: /.+\|.+/,
  InternalHeader: /^#[^\^]+/,
  InternalBlock: /^#\^.+/,
  ExternalHeader: /.+#[^\^]+/,
  ExternalBlock: /.+#\^.+/,
};

function parseWikiLinkString(wikiLinkString: string): WikiLink {
  const content = wikiLinkString.slice(2, -2);

  if (Regex.Alias.test(content)) {
    let [value, alias] = content.split("|");
    return { value: value.trim(), alias: alias.trim() };
  } else {
    return { value: content.trim() };
  }
}

export function obsidianLinkBuilder(wikiLink: WikiLink | string): ObsidianLink {
  const { value, alias } =
    typeof wikiLink === "string" ? parseWikiLinkString(wikiLink) : wikiLink;

  let out = {};
  if (alias) out["alias"] = alias;

  if (Regex.InternalHeader.test(value)) {
    out["type"] = ObsidianLinkType.Header;
    out["header"] = value.slice(1);
  } else if (Regex.InternalBlock.test(value)) {
    out["type"] = ObsidianLinkType.Block;
    out["block"] = value.slice(2);
  } else if (Regex.ExternalHeader.test(value)) {
    const [page, header] = value.split("#");
    out["type"] = ObsidianLinkType.PageHeader;
    out["page"] = page;
    out["header"] = header;
  } else if (Regex.ExternalBlock.test(value)) {
    const [page, block] = value.split("#^");
    out["type"] = ObsidianLinkType.PageBlock;
    out["page"] = page;
    out["block"] = block;
  } else {
    out["type"] = ObsidianLinkType.Page;
    out["page"] = value;
  }

  return out as ObsidianLink;
}
