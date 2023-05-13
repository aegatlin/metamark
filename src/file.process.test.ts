import { expect, test } from "vitest";
import { getFileName, getFrontmatterAndMd } from "./file.process";

// `fileProcess` is testing in ./tests/integrations/file.test.ts

function setup() {
  const filePath = "./tests/testMds/Test File.md";
  return { filePath };
}

test("getFileName", () => {
  const actualOf = (filePath: string) => getFileName(filePath);

  expect(actualOf("any.file")).toBe("any");
  expect(actualOf("/path/to/a/File Name.txt")).toBe("File Name");
  expect(actualOf("/with/no/ext/hello")).toBe("hello");
});

test("getFrontmatterAndMarkdown", () => {
  const { filePath } = setup();
  const { frontmatter, md } = getFrontmatterAndMd(filePath);
  expect(frontmatter).toStrictEqual({
    public: true,
    slugBase: "/custom-base",
    tags: ["markdown", "yaml", "html"],
  });
});
