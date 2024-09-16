import slugify from "@sindresorhus/slugify";
import matter from "gray-matter";
import elixir from "highlight.js/lib/languages/elixir";
import { common as commonLanguagesRecord } from "lowlight";
import { Root as MdastRoot } from "mdast";
import fs from "node:fs";
import path from "node:path";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeExternalLinks from "rehype-external-links";
import rehypeHighlight from "rehype-highlight";
import rehypeMathjaxChtml from "rehype-mathjax/chtml";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkCallouts from "remark-callouts";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { remarkObsidianLink } from "remark-obsidian-link";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import m from "./";
import * as lib from "./lib";
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

    const file: Metamark.Obsidian.Vault.FileData = {
      fileName,
      slug: slugify(fileName, { decamelize: false }),
      frontmatter,
      firstParagraphText: lib.mdast.getFirstParagraphText(mdastRoot) ?? "",
      html: htmlString,
      toc: lib.hast.getToc(htmlString),
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
        .use(remarkCallouts)
        .use(remarkMath)
        .use(remarkRehype)
        .use(rehypeExternalLinks)
        .use(rehypeSlug)
        .use(rehypeAutolinkHeadings, { behavior: "wrap" })
        // 37 common languages https://github.com/wooorm/lowlight/blob/main/lib/common.js
        .use(rehypeHighlight, {
          languages: { ...commonLanguagesRecord, elixir },
        })
        .use(rehypeMathjaxChtml, {
          chtml: {
            fontURL:
              "https://cdn.jsdelivr.net/npm/mathjax@3/es5/output/chtml/fonts/woff-v2",
          },
        })
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
