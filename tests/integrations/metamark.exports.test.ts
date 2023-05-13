import { expectTypeOf, test } from "vitest";
import m from "../../src/index";

test("metamark exports", () => {
  expectTypeOf(m.file.process).toBeFunction();

  expectTypeOf(m.file.utility.getFileName).toBeFunction();
  expectTypeOf(m.file.utility.getFrontmatterAndMd).toBeFunction();

  expectTypeOf(m.obsidian.vault.process).toBeFunction();
  expectTypeOf(m.obsidian.vault.toJson).toBeFunction();

  expectTypeOf(m.utility.toSlug).toBeFunction();
});
