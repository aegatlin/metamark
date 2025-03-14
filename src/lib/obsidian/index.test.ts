import { describe, expect, test } from "vitest";
import * as testlib from "../../../test/testlib";
import * as lib from "../../lib";

describe("defaultFilePathAllowSetBuilder", () => {
  test("flat file structure", () => {
    const tmpVaultPath = testlib.fs.tmpVault();
    const { filePath: filePath1 } = testlib.fs.newFile({
      parentDirPath: tmpVaultPath,
      fileName: testlib.random.string16chars(),
      content: testlib.markdown.frontmatterPublicTrue(),
    });
    const { filePath: filePath2 } = testlib.fs.newFile({
      parentDirPath: tmpVaultPath,
      fileName: testlib.random.string16chars(),
      content: testlib.markdown.frontmatterPublicFalse(),
    });
    const { filePath: filePath3 } = testlib.fs.newFile({
      parentDirPath: tmpVaultPath,
      fileName: testlib.random.string16chars(),
      content: testlib.markdown.frontmatterPublicTrue(),
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
      content: testlib.markdown.frontmatterPublicTrue(),
    });
    const { filePath: filePath2 } = testlib.fs.newFile({
      parentDirPath: tmpVaultPath,
      fileName: testlib.random.string16chars(),
      content: testlib.markdown.frontmatterPublicFalse(),
    });
    const { dirPath: subDirPath } = testlib.fs.newDir({
      dirName: testlib.random.string16chars(),
      parentDirPath: tmpVaultPath,
    });
    const { filePath: filePath3 } = testlib.fs.newFile({
      parentDirPath: subDirPath,
      fileName: testlib.random.string16chars(),
      content: testlib.markdown.frontmatterPublicTrue(),
    });
    const { filePath: filePath4 } = testlib.fs.newFile({
      parentDirPath: subDirPath,
      fileName: testlib.random.string16chars(),
      content: testlib.markdown.frontmatterPublicFalse(),
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
