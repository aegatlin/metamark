import { expect, test } from "vitest";
import * as testlib from "../../test/testlib";
import * as lib from "../lib";

test("getFirstParagraphText", () => {
  const md = `
---
some frontmatter
---

## Intro

This is the first paragraph text.

This is the second paragraph text.
    `;
  const mdastRoot = testlib.mdast.fromMarkdown(md);

  const actual = lib.mdast.getFirstParagraphText(mdastRoot);

  expect(actual).toBe("This is the first paragraph text.");
});
