import { expect, test } from "vitest";
import m from "../src/index.js";

function setup() {
  return { vaultPath: "./test/testVault/" };
}

test("vault", () => {
  const { vaultPath } = setup();

  const vaultData = m.obsidian.vault.process(vaultPath);

  expect(vaultData.length).toBe(3);
  expect(vaultData.find((d) => d.fileName === "other2")).toBeUndefined();

  const testFile = vaultData.find((d) => d.fileName === "Test File");
  expect(testFile?.firstParagraphText).toMatch("I am a markdown file!");
  expect(testFile?.frontmatter).toEqual(
    expect.objectContaining({
      public: true,
      tags: ["markdown", "yaml", "html"],
    })
  );
  expect(testFile?.slug).toBe("test-file");
  expect(testFile?.toc).toEqual([
    {
      depth: 1,
      id: "hello",
      title: "Hello",
    },
    {
      depth: 2,
      id: "more",
      title: "More",
    },
  ]);

  const html = testFile?.html;
  // html test wiki links
  expect(html).toMatch('<a href="/content/other1" title="">other1</a>');
  expect(html).not.toMatch('<a href="/content/other2" title="">other2</a>');
  expect(html).toMatch('<a href="/content/other3" title="">other3</a>');

  // html test default header ids and autolinks
  expect(html).toMatch('<h1 id="hello"><a href="#hello">Hello</a></h1>');
  expect(html).toMatch('<h2 id="more"><a href="#more">More</a></h2>');

  // test default external link
  expect(html).toMatch(
    '<a href="https://www.google.com" rel="nofollow">external link</a>'
  );

  // test default callout
  expect(html).toMatch("<strong><p>Tip</p></strong>");
  expect(html).toMatch(
    '<div class="callout-content" style=""><p>this is a callout section of type tip with a header</p></div>'
  );
  expect(html).toMatch(
    "<strong><p>this is a callout section of type info without a header</p></strong>"
  );

  // test default math
  expect(html).toMatch(
    /<span class="math math-inline"><mjx-container class="MathJax" jax="CHTML">/
  );
  expect(html).toMatch(
    /<div class="math math-display"><mjx-container class="MathJax" jax="CHTML" display="true">/
  );
});
