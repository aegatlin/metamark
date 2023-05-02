import { describe, it, expect } from "vitest";
import { metamark as m } from "../lib/index.js";
import { escapeRegExp } from "./utils.js";

describe("Metamark.getMark", () => {
  it("works with defaults", () => {
    const pageAllowSet = new Set(["Wiki Link"]);
    const actual = m.mark.getMark("./tests/Test File.md", pageAllowSet);

    expect(actual.page).toStrictEqual("Test File");
    expect(actual.slug).toStrictEqual("test-file");
    expect(actual.firstParagraphText).toStrictEqual("I am a markdown file!");
    expect(actual.frontmatter).toStrictEqual({
      public: true,
      slugBase: "/custom-base",
      tags: ["markdown", "yaml", "html"],
    });
    expect(actual.toc).toStrictEqual([
      { title: "Hello", id: "hello", depth: 1 },
      { title: "More", id: "more", depth: 2 },
    ]);
    expect(actual.html).toMatch(
      /<a href="\/content\/wiki-link" title="">Wiki Link<\/a>/g
    );
    expect(actual.text).toMatch(/This is a Wiki Link./g);

    // callouts
    expect(actual.html).toMatch(
      new RegExp(
        escapeRegExp(
          `<blockquote class="callout" style="border-left-color:#00bfa6;">
<div class="callout-title tip" style="background-color: #00bfa61a;"><span style="color:#00bfa6" class="callout-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide-flame"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path></svg></span><strong><p>Tip</p></strong></div>
<div class="callout-content" style=""><p>this is a callout section of type tip with a header</p></div>
</blockquote>`,
          "g"
        )
      )
    );

    expect(actual.html).toMatch(
      new RegExp(
        escapeRegExp(
          `<blockquote class="callout" style="border-left-color:#00b8d4;">
<div class="callout-title info" style="background-color: #00b8d41a;"><span style="color:#00b8d4" class="callout-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide-info"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg></span><strong><p>this is a callout section of type info without a header</p></strong></div>
</blockquote>`,
          "g"
        )
      )
    );
  });
});
