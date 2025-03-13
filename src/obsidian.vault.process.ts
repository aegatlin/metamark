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
import { remarkObsidianLink } from "remark-obsidian-link"; //metadown version 
import remarkParse from "remark-parse"; 
import remarkRehype from "remark-rehype";
import remarkImages from 'remark-images' //wip
//import wikiLinkPlugin from "@portaljs/remark-wiki-link"; ///wip 2
import wikiLinkPlugin from 'remark-wiki-link-plus';
import { unified } from "unified";
import m from "./";
import * as lib from "./lib";
import { toLinkBuilder } from "./obsidian.vault.toLinkBuilder";
import { Metamark } from "./types";

// import {remarkWikiParser} from './myWikiParser' //wip 3

import remarkWikiParser from './myWikiParser2' //wip 3


/**
 * Process an Obsidian vault directory and return file data for public files
 */
export function obsidianVaultProcess(
  dirPath: string,
  opts?: Metamark.Obsidian.Vault.ProcessOptions,
): Metamark.Obsidian.Vault.FileData[] {
  // Normalize the input path first
  dirPath = path.normalize(dirPath);
   
  // handle options
  const filePathAllowSet =
    opts?.filePathAllowSetBuilder?.(dirPath) ??
    defaultFilePathAllowSetBuilder(dirPath);

  const toLink = toLinkBuilder(
    opts?.toLinkBuilderOpts ?? {
      filePathAllowSet,
      toSlug: m.utility.toSlug,
      prefix: opts?.notePathPrefix ?? "/content",
    },
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

    // Calculate relative path from vault root
    const relativePath = path.relative(dirPath, filePath);

    const file: Metamark.Obsidian.Vault.FileData = {
      fileName,
      slug: slugify(fileName, { decamelize: false }),
      frontmatter,
      firstParagraphText: lib.mdast.getFirstParagraphText(mdastRoot) ?? "",
      plain:  lib.hast.getPlainText(htmlString), // for text2speech, or for plain text emails.  
   
      html: htmlString,
        toc: lib.hast.getToc(htmlString),
      originalFilePath: relativePath,
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
      
       // .use(wikiLinkPlugin, { pathFormat: "obsidian-absolute" })//  
         .use(remarkObsidianLink, { toLink })   //metadown version

       //  .use(wikiLinkPlugin )
        // wikiLinkPlugin

         /*
          .use(remarkWikiParser, {
            debug:true,
            toLink, 
            toImage: ({ value, alias }) => ({
            uri: `/assets/${value}`,
            title: alias,
            value: alias || value
          }),
        }) //wip 3
         */
       

      //  .use(wikiLinkPlugin, { pathFormat: "obsidian-absolute" })//  
        // https://www.npmjs.com/package/@portaljs/remark-wiki-link
           

        ///images remains after parsing... wip
       
       /* .use(remarkImages, {
          imageExtensions: ['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp'], //— which file extensions to consider as images, without dots
          link: true //— whether to wrap the image with a link to it
        })
          */
      /* */
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
    const filePathAllowSet = new Set<string>();

    function scanDirectory(currentPath: string) {
      const dirEntries = fs.readdirSync(currentPath, { withFileTypes: true });

      dirEntries.forEach((dirEntry) => {
        const entryPath = path.join(currentPath, dirEntry.name);

        if (dirEntry.isDirectory()) {
          // Recursively scan subdirectories
          scanDirectory(entryPath);
        } else if (dirEntry.isFile()) {
          const raw = fs.readFileSync(entryPath, "utf8");
          const { data: frontmatter } = matter(raw);

          if (frontmatter?.public) {
            filePathAllowSet.add(entryPath);
          }
        }
      });
    }

    scanDirectory(dirPath);
    return filePathAllowSet;
  };