import { expect, test } from "vitest";
import * as lib from "../lib";

function setup() {
  const filePath = "./test/testVault/Test File.md";
  return { filePath };
}

test("toSlug", () => {
  const actualOf = (fileName: string) => lib.utility.toSlug(fileName);

  expect(actualOf("Wiki Link")).toBe("wiki-link");
  expect(actualOf("JavaScript")).toBe("javascript");
  expect(actualOf("Don't repeat yourself")).toBe("dont-repeat-yourself");
  expect(actualOf("Conway's Law")).toBe("conways-law");
  expect(actualOf("Dogs' Treats")).toBe("dogs-treats");
});

test("getFileName", () => {
  const actualOf = (filePath: string) => lib.utility.getFileName(filePath);

  expect(actualOf("any.file")).toBe("any");
  expect(actualOf("/path/to/a/File Name.txt")).toBe("File Name");
  expect(actualOf("/with/no/ext/hello")).toBe("hello");
});

test("getFrontmatterAndMarkdown", () => {
  const { filePath } = setup();

  const { frontmatter, md } = lib.utility.getFrontmatterAndMd(filePath);

  expect(frontmatter).toStrictEqual({
    public: true,
    tags: ["markdown", "yaml", "html"],
  });
  expect(md).toMatch("I am a markdown file!");
});
