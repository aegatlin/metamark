import { obsidianLinkBuilder } from "./obsidianLinkBuilder.js";
import { test, expect } from "vitest";

test("works", () => {
  expect(obsidianLinkBuilder("[[Wiki Link]]")).toStrictEqual({
    type: "page",
    page: "Wiki Link",
  });

  expect(obsidianLinkBuilder("[[Wiki Link|Alias]]")).toStrictEqual({
    type: "page",
    page: "Wiki Link",
    alias: "Alias",
  });

  expect(obsidianLinkBuilder("[[Wiki Link#Header]]")).toStrictEqual({
    type: "page-header",
    page: "Wiki Link",
    header: "Header",
  });

  expect(obsidianLinkBuilder("[[Wiki Link#Header|Alias]]")).toStrictEqual({
    type: "page-header",
    page: "Wiki Link",
    header: "Header",
    alias: "Alias",
  });

  expect(obsidianLinkBuilder("[[Wiki Link#^block]]")).toStrictEqual({
    type: "page-block",
    page: "Wiki Link",
    block: "block",
  });

  expect(obsidianLinkBuilder("[[Wiki Link#^block | Alias]]")).toStrictEqual({
    type: "page-block",
    page: "Wiki Link",
    block: "block",
    alias: "Alias",
  });

  expect(obsidianLinkBuilder("[[#Header Link]]")).toStrictEqual({
    type: "header",
    header: "Header Link",
  });

  expect(obsidianLinkBuilder("[[#Header Link | Aliased]]")).toStrictEqual({
    type: "header",
    header: "Header Link",
    alias: "Aliased",
  });

  expect(obsidianLinkBuilder("[[#^block]]")).toStrictEqual({
    type: "block",
    block: "block",
  });

  expect(obsidianLinkBuilder("[[#^block| Alias]]")).toStrictEqual({
    type: "block",
    block: "block",
    alias: "Alias",
  });
});
