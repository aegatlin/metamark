import { expect, test } from "vitest";
import { Raw, file } from "./index.js";

test("getFileName", () => {
  const actualOf = (p: string) => file.getFileName(p);

  expect(actualOf("any.file")).toBe("any");
  expect(actualOf("/path/to/a/File Name.txt")).toBe("File Name");
  expect(actualOf("/with/no/ext/hello")).toBe("hello");
});

test("getRaw.fromFilePath", () => {
  const actual = file.getRaw.fromFilePath("./tests/Test File.md");
  expect(actual).toMatch(/public: true/);
  expect(actual).toMatch(/I am a markdown file/);
});

test("getFm.fromRaw", () => {
  const actualOf = (raw: Raw) => file.getFm.fromRaw(raw);
  expect(actualOf("---\npublic: true\n---")).toStrictEqual({ public: true });
  expect(actualOf('---\na: "one"\nb: 2\nc: 3.0')).toStrictEqual({
    a: "one",
    b: 2,
    c: 3.0,
  });
});
