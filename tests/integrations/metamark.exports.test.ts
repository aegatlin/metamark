import { expect, test } from "vitest";
import m from "../../src/index";

test("metamark exports", () => {
  expect(m.file.process).toBeTypeOf("function");

  expect(m.file.utility.getFileName).toBeTypeOf("function");
  expect(m.file.utility.getFrontmatterAndMd).toBeTypeOf("function");

  expect(m.obsidian.vault.process).toBeTypeOf("function");

  expect(m.utility.toSlug).toBeTypeOf("function");
});
