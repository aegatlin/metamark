import { test, expect } from "vitest";
import { Metamark } from "../lib/metamark";
import { unified } from "unified";

test("preset", () => {
  const actual = unified()
    .use(Metamark.preset)
    .processSync("# Hello")
    .toString();
  const expected = '<h1 id="hello"><a href="#hello">Hello</a></h1>';
  expect(actual).toBe(expected);
});
