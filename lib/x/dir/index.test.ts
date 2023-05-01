import { expect, test } from "vitest";
import { dir } from "./index.js";

// 1 and 3 are `public: true`
// 2 is `public: false`

test("dir.process with default shouldAdd", () => {
  const { filePaths, pageAllowSet } = dir.process("./tests/test_dir");
  expect(filePaths).toEqual([
    "tests/test_dir/test dir file 1.md",
    "tests/test_dir/test dir file 3.md",
  ]);

  expect(pageAllowSet.has("test dir file 1")).toBe(true);
  expect(pageAllowSet.has("test dir file 3")).toBe(true);
  expect(pageAllowSet.size).toBe(2);
});

test("dir.process with custom shouldAdd", () => {
  const { filePaths, pageAllowSet } = dir.process(
    "./tests/test_dir",
    ({ frontmatter: f }) => !f?.public
  );
  expect(filePaths).toEqual(["tests/test_dir/test dir file 2.md"]);

  expect(pageAllowSet.has("test dir file 2")).toBe(true);
  expect(pageAllowSet.size).toBe(1)
});
