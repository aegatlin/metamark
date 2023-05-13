import { expect, test } from "vitest";
import m from "../../src/index.js";
import { h } from "hastscript";

function setup() {
  const filePath = "./tests/testMds/Test File.md";
  return { filePath };
}

test("fileProcess default config", () => {
  const { filePath } = setup();
  const actual = m.file.process(filePath);

  expect(actual.fileName).toBe("Test File");
  expect(actual.firstParagraphText).toBe("I am a markdown file!");
  expect(actual.frontmatter).toStrictEqual({
    public: true,
    slugBase: "/custom-base",
    tags: ["markdown", "yaml", "html"],
  });
  expect(actual.slug).toBe("test-file");
  expect(actual.text).toMatch("More");
  expect(actual.text).toMatch("this is a callout");

  // TODO: it's bad text because it's not being thoroughly parsed.
  // console.log('?', actual.text)
  // expect(actual.text).toMatch("This is a Wiki Link");
  expect(actual.html).toMatch(
    '<a href="/content/wiki-link" title="">Wiki Link</a>'
  );

  expect(actual.html).toMatch(
    '<a href="https://www.google.com" rel="nofollow">external link</a>'
  );
});

test("fileProcess custom config rehype external links", () => {
  const { filePath } = setup();

  const file = m.file.process(filePath, {
    unified: {
      rehypeExternalLinks: { options: { rel: "nofollow", target: "_blank" } },
    },
  });

  expect(file.html).toMatch(
    '<a href="https://www.google.com" target="_blank" rel="nofollow">external link</a>'
  );
});

test("fileProcess custom config rehype autolink headings", () => {
  const { filePath } = setup();

  const file = m.file.process(filePath, {
    unified: {
      rehypeAutolinkHeadings: {
        options: { behavior: "before", content: h("span", "autolink") },
      },
    },
  });

  expect(file.html).toMatch(
    '<a href="#hello"><span>autolink</span></a><h1 id="hello">Hello</h1>'
  );
  expect(file.html).toMatch(
    '<a href="#more"><span>autolink</span></a><h2 id="more">More</h2>'
  );
});

// TODO: for most obsidian users they will probably want access to
// frontmatter if they want a custom toLink function.
// We probably just want to give them more generic controls 
// in the file-processing-loop for obsidian.
// Consider moving this to the obsidian layer.
// test("fileProcess custom config remark obsidian link", () => {
//   const { filePath } = setup();

//   const file = m.file.process(filePath, {
//     unified: {
//       remarkObsidianLink: {
//         toLink: (wikiLink) => {
//           const { frontmatter } = m.file.utility.getFrontmatterAndMd(filePath);
//           const prefix = frontmatter.slugBase;
//           const page = m.file.utility.getFileName(filePath);
//           const slug = m.utility.toSlug(`${page} custom SUFFIX`);
//           return {
//             value: wikiLink.value,
//             uri: `${prefix}/${slug}`,
//           };
//         },
//       },
//     },
//   });
// });
