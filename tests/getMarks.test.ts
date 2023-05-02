import { test, describe, it, expect } from "vitest";
import { metamark as m } from "../lib/index.js";

test("pages NOT in pageAllowSet are NOT included", () => {
  const pageAllowSet = new Set(["Wiki Link"]);
  const actuals = m.mark.getMarks(["./tests/Test File.md"], pageAllowSet);
  expect(actuals).toStrictEqual([]);
});

test("happy path with simple filePathsList and pageAllowSet", () => {
  const pageAllowSet = new Set(["Test File", "Wiki Link"]);
  const actuals = m.mark.getMarks(["./tests/Test File.md"], pageAllowSet);
  const actual = actuals[0];

  expect(actual.page).toBe("Test File");
  expect(actual.slug).toBe("test-file");
  expect(actual.firstParagraphText).toBe("I am a markdown file!");
  expect(actual.frontmatter).toStrictEqual({
    public: true,
    slugBase: "/custom-base",
    tags: ["markdown", "yaml", "html"],
  });
  expect(actual.toc).toStrictEqual([
    { title: "Hello", id: "hello", depth: 1 },
    { title: "More", id: "more", depth: 2 },
  ]);
  expect(actual.html).toMatch(
    /<a href="\/content\/wiki-link" title="">Wiki Link<\/a>/g
  );
  expect(actual.html).toMatch(
    /<a href="http:\/\/www.google.com" target="_blank" rel="nofollow">external link<\/a>/g
  );
});

test("removes links to files NOT in pageAllowSet", () => {
  const pageAllowSet = new Set(["Test File"]);
  const actuals = m.mark.getMarks(["./tests/Test File.md"], pageAllowSet);
  const actual = actuals[0];

  expect(actual.html).toMatch(/This is a Wiki Link/);
  expect(actual.html).not.toMatch(
    /<a href="\/content\/wiki-link" title="">Wiki Link<\/a>/g
  );
});

it("accept custom get slug builder function", () => {
  const pageAllowSet = new Set(["Test File", "Wiki Link"]);
  const actuals = m.mark.getMarks(["./tests/Test File.md"], pageAllowSet, {
    getPageUriBuilder:
      ({ frontmatter }) =>
      (page, getSlug) => ({
        uri: frontmatter.slugBase,
        slug: getSlug(`${page} custom SUFFIX`),
      }),
  });
  const actual = actuals[0];

  expect(actual.html).toMatch(
    /<a href="\/custom-base\/wiki-link-custom-suffix" title="">Wiki Link<\/a>/g
  );
});
