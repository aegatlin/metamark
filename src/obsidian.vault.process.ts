import slugify from "@sindresorhus/slugify";
import matter from "gray-matter";
import { Root as HastRoot } from "hast";
import { fromHtml } from "hast-util-from-html";
import { heading } from "hast-util-heading";
import { toText } from "hast-util-to-text";
import elixir from "highlight.js/lib/languages/elixir";
import { Root as MdastRoot } from "mdast";
import { toString } from "mdast-util-to-string";
import fs from "node:fs";
import path from "node:path";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeExternalLinks from "rehype-external-links";
import rehypeHighlight from "rehype-highlight";
import rehypeMathjax from "rehype-mathjax";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkCallouts from "remark-callouts";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { remarkObsidianLink } from "remark-obsidian-link";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { visit } from "unist-util-visit";
import m from "./";
import { toLinkBuilder } from "./obsidian.vault.toLinkBuilder";
import { Metamark } from "./types";

export function obsidianVaultProcess(
  dirPath: string,
  opts?: Metamark.Obsidian.Vault.ProcessOptions
): Metamark.Obsidian.Vault.FileData[] {
  // handle options
  const filePathAllowSet =
    opts?.filePathAllowSetBuilder?.(dirPath) ??
    defaultFilePathAllowSetBuilder(dirPath);

  const toLink = toLinkBuilder(
    opts?.toLinkBuilderOpts ?? {
      filePathAllowSet,
      toSlug: m.utility.toSlug,
      prefix: "/content",
    }
  );

  const processor = unifiedProcessorBuilder({ toLink });

  // collect pages
  const pages: Metamark.Obsidian.Vault.FileData[] = [];

  for (const filePath of filePathAllowSet) {
    const { name: fileName } = path.parse(filePath);
    const raw = fs.readFileSync(filePath, "utf8");
    const { content: md, data: frontmatter } = matter(raw);

    const mdastRoot: MdastRoot = processor.parse(md);
    const htmlString = processor.processSync(md).toString();

    // get First paragraph text
    const firstParagraph = mdastRoot.children.find(
      (child) => child.type === "paragraph"
    );

    const firstParagraphText = toString(firstParagraph);

    // get Toc
    const hast: HastRoot = fromHtml(htmlString);

    const flatToc: Metamark.TocItem[] = [];

    visit(hast, heading, (node: any) => {
      const tagName = node?.tagName;
      flatToc.push({
        title: toText(node),
        depth: parseInt(tagName?.at(1)) || -1,
        id: node?.properties?.id,
      });
    });

    const file: Metamark.Obsidian.Vault.FileData = {
      fileName,
      slug: slugify(fileName, { decamelize: false }),
      frontmatter,
      firstParagraphText,
      html: htmlString,
      toc: flatToc,
    };

    pages.push(file);
  }

  return pages;
}

const unifiedProcessorBuilder: Metamark.Obsidian.Vault.UnifiedProcessorBuilder =
  ({ toLink }) => {
    return (
      unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkObsidianLink, { toLink })
        // TODO: This can be fixed with remark-obsidian-link, probably
        //@ts-ignore
        .use(remarkCallouts)
        .use(remarkMath)
        .use(remarkRehype)
        .use(rehypeExternalLinks)
        .use(rehypeSlug)
        .use(rehypeAutolinkHeadings, { behavior: "wrap" })
        .use(rehypeHighlight, { languages: { elixir } })
        .use(rehypeMathjax)
        .use(rehypeStringify)
    );
  };

/**
 * This function is the default implementation of the "allow set" builder. It
 * takes the dirpath and constructs from is a `Set<string>` that represents the
 * "allow set", which is the set of files that are considered public, and viable
 * to be linked to in other notes.
 */
const defaultFilePathAllowSetBuilder: Metamark.Obsidian.Vault.FilePathAllowSetBuilder =
  (dirPath) => {
    const dirEntries = fs.readdirSync(dirPath, { withFileTypes: true });

    const filePathAllowSet = new Set<string>();

    dirEntries.forEach((dirEntry) => {
      if (dirEntry.isFile()) {
        const filePath = path.join(dirPath, dirEntry.name);
        const raw = fs.readFileSync(filePath, "utf8");
        const { data: frontmatter } = matter(raw);

        if (!!frontmatter?.public) {
          filePathAllowSet.add(filePath);
        }
      }
    });

    return filePathAllowSet;
  };
