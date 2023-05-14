import { Link, WikiLink } from "remark-obsidian-link";
import { expect, test } from "vitest";
import {
  ObsidianLink,
  toLinkBuilder,
  wikiToObsidian,
} from "./obsidian.vault.toLinkBuilder";
import m from "../src/";

test("toLinkBuilder", () => {
  const toLink = toLinkBuilder({
    filePathAllowSet: new Set(["/Wiki Link.md"]),
    toSlug: m.utility.toSlug,
    prefix: "/content",
  });

  for (const l of links) {
    expect(toLink(l.wikiLink)).toEqual(l.mdastLink);
  }
});

test("wikiToObsidian", () => {
  for (const l of links) {
    expect(wikiToObsidian(l.wikiLink)).toEqual(l.obsidianLink);
  }
});

// Wiki Link is _in_ the allowSet
// Unallowed Link is _not_ in the allowSet
const links: {
  wikiText: string;
  wikiLink: WikiLink;
  obsidianLink: ObsidianLink;
  mdastLink: Link | string;
}[] = [
  {
    wikiText: "[[Wiki Link]]",
    wikiLink: { value: "Wiki Link" },
    obsidianLink: {
      type: "page",
      page: "Wiki Link",
    },
    mdastLink: {
      value: "Wiki Link",
      uri: "/content/wiki-link",
    },
  },
  {
    wikiText: "[[Wiki Link | Alias]]",
    wikiLink: { value: "Wiki Link", alias: "Alias" },
    obsidianLink: {
      type: "page",
      page: "Wiki Link",
      alias: "Alias",
    },
    mdastLink: {
      value: "Alias",
      uri: "/content/wiki-link",
    },
  },
  {
    wikiText: "[[Unallowed Link]]",
    wikiLink: { value: "Unallowed Link" },
    obsidianLink: {
      type: "page",
      page: "Unallowed Link",
    },
    mdastLink: "Unallowed Link",
  },
  {
    wikiText: "[[Unallowed Link | Alias]]",
    wikiLink: { value: "Unallowed Link", alias: "Alias" },
    obsidianLink: {
      type: "page",
      page: "Unallowed Link",
      alias: "Alias",
    },
    mdastLink: "Alias",
  },
  {
    wikiText: "[[Wiki Link#Header]]",
    wikiLink: { value: "Wiki Link#Header" },
    obsidianLink: {
      type: "page-header",
      page: "Wiki Link",
      header: "Header",
    },
    mdastLink: {
      value: "Wiki Link#Header",
      uri: "/content/wiki-link#header",
    },
  },
  {
    wikiText: "[[Wiki Link#Header | Alias]]",
    wikiLink: { value: "Wiki Link#Header", alias: "Alias" },
    obsidianLink: {
      type: "page-header",
      page: "Wiki Link",
      header: "Header",
      alias: "Alias",
    },
    mdastLink: {
      value: "Alias",
      uri: "/content/wiki-link#header",
    },
  },
  {
    wikiText: "[[Unallowed Link#Header]]",
    wikiLink: { value: "Unallowed Link#Header" },
    obsidianLink: {
      type: "page-header",
      page: "Unallowed Link",
      header: "Header",
    },
    mdastLink: "Unallowed Link#Header",
  },
  {
    wikiText: "[[Unallowed Link#Header | Alias]]",
    wikiLink: { value: "Unallowed Link#Header", alias: "Alias" },
    obsidianLink: {
      type: "page-header",
      page: "Unallowed Link",
      header: "Header",
      alias: "Alias",
    },
    mdastLink: "Alias",
  },
  {
    wikiText: "[[Wiki Link#^block]]",
    wikiLink: { value: "Wiki Link#^block" },
    obsidianLink: {
      type: "page-block",
      page: "Wiki Link",
      block: "block",
    },
    mdastLink: {
      value: "Wiki Link",
      uri: "/content/wiki-link",
    },
  },
  {
    wikiText: "[[Wiki Link#^block | Alias ]]",
    wikiLink: { value: "Wiki Link#^block", alias: "Alias" },
    obsidianLink: {
      type: "page-block",
      page: "Wiki Link",
      block: "block",
      alias: "Alias",
    },
    mdastLink: {
      value: "Alias",
      uri: "/content/wiki-link",
    },
  },
  {
    wikiText: "[[Unallowed Link#^block]]",
    wikiLink: { value: "Unallowed Link#^block" },
    obsidianLink: {
      type: "page-block",
      page: "Unallowed Link",
      block: "block",
    },
    mdastLink: "Unallowed Link",
  },
  {
    wikiText: "[[Unallowed Link#^block | Alias ]]",
    wikiLink: { value: "Unallowed Link#^block", alias: "Alias" },
    obsidianLink: {
      type: "page-block",
      page: "Unallowed Link",
      block: "block",
      alias: "Alias",
    },
    mdastLink: "Alias",
  },
  {
    wikiText: "[[#Header Link]]",
    wikiLink: { value: "#Header Link" },
    obsidianLink: {
      type: "header",
      header: "Header Link",
    },
    mdastLink: {
      value: "#Header Link",
      uri: "#header-link",
    },
  },
  {
    wikiText: "[[#Header Link | Alias]]",
    wikiLink: { value: "#Header Link", alias: "Alias" },
    obsidianLink: {
      type: "header",
      header: "Header Link",
      alias: "Alias",
    },
    mdastLink: {
      value: "Alias",
      uri: "#header-link",
    },
  },
  {
    wikiText: "[[#^block]]",
    wikiLink: { value: "#^block" },
    obsidianLink: {
      type: "block",
      block: "block",
    },
    mdastLink: "#^block",
  },
  {
    wikiText: "[[#^block | Alias]]",
    wikiLink: { value: "#^block", alias: "Alias" },
    obsidianLink: {
      type: "block",
      block: "block",
      alias: "Alias",
    },
    mdastLink: "Alias",
  },
  // The following are _not_ in the page allow set
];
