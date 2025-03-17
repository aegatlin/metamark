import { describe, expect, test } from "vitest";
import * as testlib from "../../test/testlib";
import * as lib from ".";
import matter from "gray-matter";

describe("defaultFilePathAllowSetBuilder", () => {
  test("flat file structure", () => {
    const tmpVaultPath = testlib.fs.tmpVault();
    const { filePath: filePath1 } = testlib.fs.newFile({
      parentDirPath: tmpVaultPath,
      fileName: testlib.random.string16chars(),
      content: matter.stringify("", { public: true }),
    });
    const { filePath: filePath2 } = testlib.fs.newFile({
      parentDirPath: tmpVaultPath,
      fileName: testlib.random.string16chars(),
      content: matter.stringify("", { public: false }),
    });
    const { filePath: filePath3 } = testlib.fs.newFile({
      parentDirPath: tmpVaultPath,
      fileName: testlib.random.string16chars(),
      content: matter.stringify("", { public: true }),
    });

    const defaultFilePathAllowSet =
      lib.obsidian.defaultFilePathAllowSetBuilder(tmpVaultPath);

    expect(defaultFilePathAllowSet.has(filePath1)).toBe(true);
    expect(defaultFilePathAllowSet.has(filePath2)).toBe(false);
    expect(defaultFilePathAllowSet.has(filePath3)).toBe(true);
    expect(defaultFilePathAllowSet.size).toBe(2);
  });

  test("nested file structure", () => {
    const tmpVaultPath = testlib.fs.tmpVault();
    const { filePath: filePath1 } = testlib.fs.newFile({
      parentDirPath: tmpVaultPath,
      fileName: testlib.random.string16chars(),
      content: matter.stringify("", { public: true }),
    });
    const { filePath: filePath2 } = testlib.fs.newFile({
      parentDirPath: tmpVaultPath,
      fileName: testlib.random.string16chars(),
      content: matter.stringify("", { public: false }),
    });
    const { dirPath: subDirPath } = testlib.fs.newDir({
      dirName: testlib.random.string16chars(),
      parentDirPath: tmpVaultPath,
    });
    const { filePath: filePath3 } = testlib.fs.newFile({
      parentDirPath: subDirPath,
      fileName: testlib.random.string16chars(),
      content: matter.stringify("", { public: true }),
    });
    const { filePath: filePath4 } = testlib.fs.newFile({
      parentDirPath: subDirPath,
      fileName: testlib.random.string16chars(),
      content: matter.stringify("", { public: false }),
    });

    const defaultFilePathAllowSet =
      lib.obsidian.defaultFilePathAllowSetBuilder(tmpVaultPath);

    expect(defaultFilePathAllowSet.has(filePath1)).toBe(true);
    expect(defaultFilePathAllowSet.has(filePath2)).toBe(false);
    expect(defaultFilePathAllowSet.has(filePath3)).toBe(true);
    expect(defaultFilePathAllowSet.has(filePath4)).toBe(false);
    expect(defaultFilePathAllowSet.size).toBe(2);
  });
});

test("traverseVault", () => {
  const vaultDirPath = testlib.fs.tmpVault();

  const { filePath: filePath1 } = testlib.fs.newFile({
    parentDirPath: vaultDirPath,
    fileName: testlib.random.string16chars(),
    content: testlib.random.string16chars(),
  });

  const { dirPath: subDirPath } = testlib.fs.newDir({
    parentDirPath: vaultDirPath,
    dirName: testlib.random.string16chars(),
  });

  const { filePath: filePath2 } = testlib.fs.newFile({
    parentDirPath: subDirPath,
    fileName: testlib.random.string16chars(),
    content: testlib.random.string16chars(),
  });

  const vaultFiles = lib.obsidian.traverseVault(vaultDirPath);
  expect(vaultFiles).toContain(filePath1);
  expect(vaultFiles).toContain(filePath2);
  expect(vaultFiles).not.toContain(subDirPath);
});

describe("getFrontmatterAndMd", () => {
  test("works with tmp vault", () => {
    const vaultDirPath = testlib.fs.tmpVault();
    const { filePath } = testlib.fs.newFile({
      parentDirPath: vaultDirPath,
      fileName: testlib.random.string16chars(),
      content: matter.stringify("## Section\n\nSection content.", { a: 1 }),
    });

    const { frontmatter, md } = lib.obsidian.getFrontmatterAndMd(filePath);

    expect(frontmatter).toEqual({ a: 1 });
    expect(md).toContain("## Section");
    expect(md).toContain("Section content.");
  });

  test("works with test vault", () => {
    const filePath = "./test/testVault/Test File.md";

    const { frontmatter, md } = lib.obsidian.getFrontmatterAndMd(filePath);

    expect(frontmatter).toStrictEqual({
      public: true,
      tags: ["markdown", "yaml", "html"],
    });
    expect(md).toMatch("I am a markdown file!");
  });
});
