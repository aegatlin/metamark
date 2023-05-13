import { Link, WikiLink } from "remark-obsidian-link";
import { expect, test } from "vitest";
import { ObsidianLink, toLink, wikiToObsidian } from "./unified.utility";

test("toLink", () => {
  for (const l of links) {
    expect(toLink(l.wikiLink)).toEqual(l.mdastLink);
  }
});

test("wikiToObsidian", () => {
  for (const l of links) {
    expect(wikiToObsidian(l.wikiLink)).toEqual(l.obsidianLink);
  }
});

const links: {
  wikiText: string;
  wikiLink: WikiLink;
  obsidianLink: ObsidianLink;
  mdastLink: Link;
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
    wikiText: "[[Wiki Link#^block]]",
    wikiLink: { value: "Wiki Link#^block" },
    obsidianLink: {
      type: "page-block",
      page: "Wiki Link",
      block: "block",
    },
    mdastLink: {
      value: "Wiki Link#^block",
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
    mdastLink: {
      value: "#^block",
      uri: "",
    },
  },
  {
    wikiText: "[[#^block | Alias]]",
    wikiLink: { value: "#^block", alias: "Alias" },
    obsidianLink: {
      type: "block",
      block: "block",
      alias: "Alias",
    },
    mdastLink: {
      value: "Alias",
      uri: "",
    },
  },
];
