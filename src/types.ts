import { Root as HastRoot } from "hast";
import { Root as MdastRoot } from "mdast";
import { Link, ToLink, WikiLink as _WikiLink } from "remark-obsidian-link";
import { Processor } from "unified";

export namespace Metamark {
  export type MdastLink = Link;
  export type WikiLink = _WikiLink;

  export namespace Obsidian {
    export namespace Vault {
      export interface FileData {
        fileName: string;
        slug: string;
        firstParagraphText: string;
        plain: string;
        frontmatter: Record<string, any>;
        html: string;
        toc: TocItem[];
        originalFilePath: string; //useful for debugging + referencing
      }

      export interface ProcessOptions {
        /**
         * Given a dirpath, build a `Set<string>` of filepaths,
         * representing pages that should be turned into html,
         * and linked to from other pages.
         *
         * The default behavior is to check the file's `frontmatter`
         * for `public: true`. Only if `public` exists and is set to
         * `true` is the filePath added to the `FilePathAllowSet`.
         */
        filePathAllowSetBuilder?: FilePathAllowSetBuilder;
        /**
         * This builder function constructs the unified.js processor
         * that is used to both parse markdown into mdast, and transform
         * markdown into html. It takes in a `toLink` function that can
         * be controlled as well via `toLinkBuilderOpts`
         *
         * The default behavior is a collection of common markdown and
         * html plugins.
         */
        unifiedProcessorBuilder?: UnifiedProcessorBuilder;
        /**
         * These options control the `toLinkBuilder` function execution. In short,
         * `remark-obsidian-link` requires a `toLink` function, and this function
         * builds that function. For example,
         *
         * ```ts
         * const toLink = toLinkBuilder(opts);
         * const mdastLink = toLink(wikiLink);
         * ```
         *
         * By default the options are:
         *
         * ```ts
         * {
         *   filePathAllowSet: [override or default],
         *   prefix: '/content',
         *   toSlug: (s: string) => slugify(s, {decamelize: false}),
         * }
         * ```
         *
         * The resulting behavior is approximately as follows:
         *
         * ```ts
         * // original string slice from markdown: "[[Wiki Link]]"
         * const wikiLinkInput = { value: "Wiki Link" };
         * const mdastLinkOutput = { value: "Wiki Link", uri: "content/wiki-link" }
         * ```
         */
        toLinkBuilderOpts?: ToLinkBuilderOpts;
        notePathPrefix?: string;
        assetPathPrefix?: string; // WIP
      }

      export type FilePathAllowSetBuilder = (dirPath: string) => Set<string>;

      export type UnifiedProcessorBuilder = (_: {
        toLink: ToLink;
      }) => Processor<MdastRoot, MdastRoot, HastRoot, HastRoot, string>;

      export type ToLinkBuilderOpts = {
        filePathAllowSet: Set<string>;
        toSlug: (s: string) => string;
          /**
         * The prefix to use for links. If notePathPrefix is provided in ProcessOptions,
         * it will override the default '/content'
         */
        prefix: string;
      };

      export type ToLinkBuilder = (_: ToLinkBuilderOpts) => ToLink;
    }
  }

  export interface TocItem {
    title: string;
    depth: number;
    id: string;
  }
}
