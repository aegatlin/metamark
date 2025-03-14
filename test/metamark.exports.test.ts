import { expect, test } from "vitest";
import m from "../src/index";

test("metamark exports", () => {
  expect(m.obsidian.vault.process).toBeTypeOf("function");

  expect(m.utility.getFileName).toBeTypeOf("function");
  expect(m.utility.getFrontmatterAndMd).toBeTypeOf("function");
  expect(m.utility.jsonStringify).toBeTypeOf("function");
  expect(m.utility.toSlug).toBeTypeOf("function");
  expect(m.utility.writeToFileSync).toBeTypeOf("function");
});
