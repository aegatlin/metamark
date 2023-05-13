import { expect, test } from "vitest";
import { toSlug } from "./utility.js";

test("toSlug", () => {
  const actualOf = (fileName: string) => toSlug(fileName);

  expect(actualOf("Wiki Link")).toBe("wiki-link");
  expect(actualOf("JavaScript")).toBe("javascript");
  expect(actualOf("Don't repeat yourself")).toBe("dont-repeat-yourself");
  expect(actualOf("Conway's Law")).toBe("conways-law");
  expect(actualOf("Dogs' Treats")).toBe("dogs-treats");
});
