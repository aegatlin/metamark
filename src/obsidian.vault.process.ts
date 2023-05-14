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
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkCallouts from "remark-callouts";
import remarkGfm from "remark-gfm";
import { remarkObsidianLink } from "remark-obsidian-link";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { visit } from "unist-util-visit";
import { toLinkBuilder } from "./obsidian.vault.toLinkBuilder";
import { Metamark } from "./types";

export function obsidianVaultProcess(
  dirPath: string,
  opts?: Metamark.Obsidian.Vault.ProcessOptions
): Metamark.Obsidian.Vault.FileData[] {
  // handle options
  const filePathAllowSet =
    opts?.buildFilePathAllowSet?.(dirPath) ??
    defaultBuildFilePathAllowSet(dirPath);

  const processor =
    opts?.buildUnifiedProcessor?.(filePathAllowSet) ??
    defaultBuildUnifiedProcessor(filePathAllowSet);

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

const defaultBuildUnifiedProcessor: Metamark.Obsidian.Vault.BuildUnifiedProcessor =
  (filePathAllowSet) => {
    const toLink = toLinkBuilder(filePathAllowSet);

    return unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkObsidianLink, { toLink })
      .use(remarkCallouts)
      .use(remarkRehype)
      .use(rehypeExternalLinks)
      .use(rehypeSlug)
      .use(rehypeAutolinkHeadings, { behavior: "wrap" })
      .use(rehypeHighlight, { languages: { elixir } })
      .use(rehypeStringify);
  };

const defaultBuildFilePathAllowSet: Metamark.Obsidian.Vault.BuildFilePathAllowSet =
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
