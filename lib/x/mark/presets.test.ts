import { test, expect } from "vitest";
import { unified } from "unified";
import { preset } from "./presets.js";

test("preset", () => {
  const actual = unified()
    .use(preset)
    .processSync("# Hello")
    .toString();
  const expected = '<h1 id="hello"><a href="#hello">Hello</a></h1>';
  expect(actual).toBe(expected);
});
