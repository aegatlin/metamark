import { test, expect } from "vitest";
import { Metamark } from "../lib/metamark";

test("works", () => {
  expect(Metamark.toText("## Wow")).toBe("Wow");
});
