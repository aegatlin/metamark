import { Root as Root$1 } from 'hast';
import { Root } from 'mdast';
import { Link, WikiLink, ToLink } from 'remark-obsidian-link';
import { Processor } from 'unified';

declare namespace Metamark {
    type MdastLink = Link;
    type WikiLink = WikiLink;
    namespace Obsidian {
        namespace Vault {
            interface FileData {
                fileName: string;
                slug: string;
                firstParagraphText: string;
                plain: string;
                frontmatter: Record<string, any>;
                html: string;
                toc: TocItem[];
                originalFilePath: string;
            }
            interface ProcessOptions {
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
                assetPathPrefix?: string;
            }
            type FilePathAllowSetBuilder = (dirPath: string) => Set<string>;
            type UnifiedProcessorBuilder = (_: {
                toLink: ToLink;
            }) => Processor<Root, Root, Root$1, Root$1, string>;
            type ToLinkBuilderOpts = {
                filePathAllowSet: Set<string>;
                toSlug: (s: string) => string;
                /**
               * The prefix to use for links. If notePathPrefix is provided in ProcessOptions,
               * it will override the default '/content'
               */
                prefix: string;
            };
            type ToLinkBuilder = (_: ToLinkBuilderOpts) => ToLink;
        }
    }
    interface TocItem {
        title: string;
        depth: number;
        id: string;
    }
}

/**
 * Process an Obsidian vault directory and return file data for public files
 */
declare function obsidianVaultProcess(dirPath: string, opts?: Metamark.Obsidian.Vault.ProcessOptions): Metamark.Obsidian.Vault.FileData[];

declare const metamark: {
    obsidian: {
        vault: {
            process: typeof obsidianVaultProcess;
        };
    };
    utility: {
        toSlug(s: string): string;
        getFileName(filePath: string): string;
        getFrontmatterAndMd(filePath: string): {
            md: string;
            frontmatter: {
                [key: string]: any;
            };
        };
        jsonStringify(o: any): string;
        writeToFileSync(filePath: string, content: string): void;
    };
};

export { Metamark, metamark as default };
