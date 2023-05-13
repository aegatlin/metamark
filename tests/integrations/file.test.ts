import { expect, test } from "vitest";
import m from "../../src/index.js";
import exp from "constants";

function setup() {
  const filePath = "./tests/testMds/Test File.md";
  return { filePath };
}

test("fileProcess default config", () => {
  const { filePath } = setup();
  const actual = m.file.process(filePath);

  expect(actual.fileName).toBe("Test File");
  expect(actual.firstParagraphText).toBe("I am a markdown file!");
  expect(actual.frontmatter).toStrictEqual({
    public: true,
    slugBase: "/custom-base",
    tags: ["markdown", "yaml", "html"],
  });
  expect(actual.slug).toBe("test-file");
  expect(actual.text).toMatch("More");
  expect(actual.text).toMatch("this is a callout");

  // TODO: it's bad text because it's not being thoroughly parsed.
  // console.log('?', actual.text)
  // expect(actual.text).toMatch("This is a Wiki Link");
  expect(actual.html).toMatch(
    '<a href="/content/wiki-link" title="">Wiki Link</a>'
  );

  expect(actual.html).toMatch(
    '<a href="https://www.google.com" rel="nofollow">external link</a>'
  );
});

test("fileProcess custom config", () => {
  const { filePath } = setup();

  const file = m.file.process(filePath, {
    unified: {
      rehypeExternalLinks: { options: { rel: "nofollow", target: "_blank" } },
    },
  });

  expect(file.html).toMatch(
    '<a href="https://www.google.com" target="_blank" rel="nofollow">external link</a>'
  );
});
