import { expect, test, describe, it } from "vitest";
import { toLinkBuilder } from "../lib/toLinkBuilder";

test("toLinkBuilder with empty pageAllowSet", () => {
  const toLink = toLinkBuilder(new Set());

  expect(toLink("[[Wiki Link]]")).toBe("Wiki Link");
  expect(toLink("[[Wiki Link | Alias]]")).toBe("Alias");
});

describe("toLinkBuilder with appropriate pageAllowSet", () => {
  const set = new Set();
  set.add("Wiki Link");
  const toLink = toLinkBuilder(set);

  it("returns links", () => {
    expect(toLink("[[Wiki Link]]")).toStrictEqual({
      value: "Wiki Link",
      uri: "/content/wiki-link",
    });

    expect(toLink("[[Wiki Link#Header Link]]")).toStrictEqual({
      value: "Wiki Link#Header Link",
      uri: "/content/wiki-link#header-link",
    });

    expect(toLink("[[Wiki Link#^block]]")).toStrictEqual({
      value: "Wiki Link",
      uri: "/content/wiki-link",
    });

    expect(toLink("[[#Header Link]]")).toStrictEqual({
      value: "Header Link",
      uri: "#header-link",
    });
  });

  it("returns text for block-links", () => {
    expect(toLink("[[#^block]]")).toStrictEqual("");
  });
});

describe("toLinkBuilder with custom get slug function", () => {
  const set = new Set();
  set.add("Wiki Link");
  const toLink = toLinkBuilder(set, (page, toSlug) => ({
    uri: "/custom/content",
    slug: toSlug(`${page}-with-additional-suffix`),
  }));

  it("returns links", () => {
    expect(toLink("[[Wiki Link]]")).toStrictEqual({
      value: "Wiki Link",
      uri: "/custom/content/wiki-link-with-additional-suffix",
    });

    expect(toLink("[[Wiki Link#Header Link]]")).toStrictEqual({
      value: "Wiki Link#Header Link",
      uri: "/custom/content/wiki-link-with-additional-suffix#header-link",
    });

    expect(toLink("[[Wiki Link#^block]]")).toStrictEqual({
      value: "Wiki Link",
      uri: "/custom/content/wiki-link-with-additional-suffix",
    });

    expect(toLink("[[#Header Link]]")).toStrictEqual({
      value: "Header Link",
      uri: "#header-link",
    });
  });

  it("returns text for block-links", () => {
    expect(toLink("[[#^block]]")).toStrictEqual("");
  });
});
