import { expect, test } from "vitest";
import { unified } from "./index.js";

test("getFirstParagraphText", () => {
  const text = `
  first para

  second para
  `;
  const actual = unified.getFirstParagraphText(text);
  expect(actual).toBe("first para");
});

test("getText", () => {
  expect(unified.getText("## Wow")).toBe("Wow");
});
