import { expect, test } from "vitest";
import { getSlug } from "./getSlug.js";

test("works", () => {
  expect(getSlug("Wiki Link")).toBe("wiki-link");
});

test("does not break apart words like JavaScript", () => {
  expect(getSlug("JavaScript")).toBe("javascript");
});

test("does not break apart contractions", () => {
  expect(getSlug("Don't repeat yourself")).toBe("dont-repeat-yourself");
  expect(getSlug("Conway's Law")).toBe("conways-law");
});

test("handles complex possessives", () => {
  expect(getSlug("Dogs' Treats")).toBe("dogs-treats");
});
