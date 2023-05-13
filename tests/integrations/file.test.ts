import { expect, test } from "vitest";
import m from "../../src/index.js";

function setup() {
  const filePath = "./tests/testMds/Test File.md";
  return { filePath };
}

test("fileProcess", () => {
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
});
