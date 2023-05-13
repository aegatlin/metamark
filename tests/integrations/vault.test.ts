import { expect, test } from "vitest";
import m from "../../src/index.js";

test("simple vault", () => {
  const vault = m.obsidian.vault.process("./tests/testVaults/simple");

  expect(vault.filePaths).toEqual(
    expect.arrayContaining([
      "tests/testVaults/simple/file1.md",
      "tests/testVaults/simple/file3.md",
    ])
  );

  expect(Array.from(vault.pageAllowSet)).toEqual(["file1", "file3"]);

  const jsonString = m.obsidian.vault.toJson(vault);
  const json = JSON.parse(jsonString);

  expect(json).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ text: "one" }),
      expect.objectContaining({ text: "three" }),
    ])
  );
});
