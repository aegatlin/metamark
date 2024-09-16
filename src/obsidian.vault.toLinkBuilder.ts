import { Link, WikiLink } from "remark-obsidian-link";
import * as lib from "./lib";
import { Metamark } from "./types";

export const toLinkBuilder: Metamark.Obsidian.Vault.ToLinkBuilder =
  ({ filePathAllowSet, toSlug, prefix }) =>
  (wikiLink) => {
    const uriOpts = { toSlug, prefix };
    const obsidianLink = wikiToObsidian(wikiLink);

    switch (obsidianLink.type) {
      case "page":
      case "page-header":
      case "page-block": {
        const pageNameAllowSet = new Set(
          Array.from(filePathAllowSet).map((filePath) =>
            lib.utility.getFileName(filePath),
          ),
        );

        return pageNameAllowSet.has(obsidianLink.page)
          ? obsidianLinkToMdastLink(obsidianLink, uriOpts)
          : toMdastValue(obsidianLink);
      }
      case "header":
        return obsidianLinkToMdastLink(obsidianLink, uriOpts);
      case "block":
        return toMdastValue(obsidianLink);
      default:
        const _exhaustiveCheck: never = obsidianLink;
        return obsidianLink;
    }
  };

type UriOpts = {
  toSlug: (s: string) => string;
  prefix: string;
};

function obsidianLinkToMdastLink(
  obsidianLink: ObsidianLink,
  uriOpts: UriOpts,
): Link {
  return {
    value: toMdastValue(obsidianLink),
    uri: toMdastUri(obsidianLink, uriOpts),
  };
}

function toMdastUri(ol: ObsidianLink, { toSlug, prefix }: UriOpts): string {
  switch (ol.type) {
    case "page":
      return `${prefix}/${toSlug(ol.page)}`;
    case "page-header":
      return `${prefix}/${toSlug(ol.page)}#${toSlug(ol.header)}`;
    case "page-block":
      return `${prefix}/${toSlug(ol.page)}`;
    case "header":
      return `#${toSlug(ol.header)}`;
    case "block":
      return "";
  }
}

function toMdastValue(ol: ObsidianLink): string {
  if (ol?.alias) return ol.alias;

  switch (ol.type) {
    case "page":
      return `${ol.page}`;
    case "page-header":
      return `${ol.page}#${ol.header}`;
    case "page-block":
      return `${ol.page}`;
    case "header":
      return `#${ol.header}`;
    case "block":
      return `#^${ol.block}`;
    default:
      const _exhaustiveCheck: never = ol;
      return ol;
  }
}

export function wikiToObsidian(wikiLink: WikiLink): ObsidianLink {
  const { value, alias } = wikiLink;

  switch (true) {
    case Regex.BlockOnly.test(value): {
      let blockOnly: BlockOnly = {
        type: "block",
        block: value.slice(2),
      };

      if (alias) blockOnly.alias = alias;

      return blockOnly;
    }
    case Regex.HeaderOnly.test(value): {
      let headerOnly: HeaderOnly = {
        type: "header",
        header: value.slice(1),
      };

      if (alias) headerOnly.alias = alias;

      return headerOnly;
    }
    case Regex.PageAndBlock.test(value): {
      const [page, block] = value.split("#^");
      let pageAndBlock: PageAndBlock = {
        type: "page-block",
        page,
        block,
      };
      if (alias) pageAndBlock.alias = alias;
      return pageAndBlock;
    }
    case Regex.PageAndHeader.test(value): {
      const [page, header] = value.split("#");
      let pageAndHeader: PageAndHeader = {
        type: "page-header",
        page,
        header,
      };
      if (alias) pageAndHeader.alias = alias;
      return pageAndHeader;
    }
    // There _could_ be a test for page that could
    // look for _not_ rest of tests
    default: {
      let page: PageOnly = {
        type: "page",
        page: value,
      };

      if (alias) page.alias = alias;
      return page;
    }
  }
}

const Regex = {
  // test for alias
  // Alias: /.+\|.+/,
  // test for starting with a header, so "header only" the test is testing for
  // NOT a block. I.e., anything not-block-like is a header
  HeaderOnly: /^#[^\^]+/,
  // test for starting with a header-block (e.g., #^block),
  // so "block only"
  BlockOnly: /^#\^.+/,
  // test for normal link with a header (i.e., does not have a block)
  PageAndHeader: /.+#[^\^]+/,
  // test for normal link with a block (this excludes the header as an option)
  PageAndBlock: /.+#\^.+/,
};

type Aliasable = { alias?: string };

// [[Page]]
// [[Page | Alias]]
interface PageOnly extends Aliasable {
  type: "page";
  page: string;
}

// [[Page#Header]]
// [[Page#Header | Alias]]
interface PageAndHeader extends Aliasable {
  type: "page-header";
  page: string;
  header: string;
}

// [[Page#^block]]
// [[Page#^block | Alias]]
interface PageAndBlock extends Aliasable {
  type: "page-block";
  page: string;
  block: string;
}

// [[#Header]]
// [[#Header | Alias]]
interface HeaderOnly extends Aliasable {
  type: "header";
  header: string;
}

// [[#^block]]
// [[#^block | Alias]]
interface BlockOnly extends Aliasable {
  type: "block";
  block: string;
}

export type ObsidianLink =
  | PageOnly
  | PageAndHeader
  | PageAndBlock
  | HeaderOnly
  | BlockOnly;
