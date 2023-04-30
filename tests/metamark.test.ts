import { test, describe, expect } from "vitest";
import { Metamark } from "../lib/metamark";
import { n } from "../lib/n";

function setup() {
  console.log("?????????", n.process.cwd());
  const md = Metamark.getRawMd("./tests/Test File.md");
  return { md };
}

test("getRawMd", () => {
  const actual = Metamark.getRawMd("./tests/Test File.md");
  expect(actual).toMatch(/public: true/);
  expect(actual).toMatch(/I am a markdown file/);
});

// test("getFirstParagraphText", () => {
//   const { md } = setup();
//   const actual = Metamark.getFirstParagraphText(md);
//   expect(actual).toBe("I am a markdown file!");
// });
