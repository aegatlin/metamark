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
                frontmatter: Record<string, any>;
                html: string;
                toc: TocItem[];
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
            }
            type FilePathAllowSetBuilder = (dirPath: string) => Set<string>;
            type UnifiedProcessorBuilder = (_: {
                toLink: ToLink;
            }) => Processor<Root, Root$1, Root$1, string>;
            type ToLinkBuilderOpts = {
                filePathAllowSet: Set<string>;
                toSlug: (s: string) => string;
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

declare function obsidianVaultProcess(dirPath: string, opts?: Metamark.Obsidian.Vault.ProcessOptions): Metamark.Obsidian.Vault.FileData[];

declare function toSlug(s: string): string;
declare function getFileName(filePath: string): string;
declare function getFrontmatterAndMd(filePath: string): {
    md: string;
    frontmatter: {
        [key: string]: any;
    };
};
declare function jsonStringify(o: any): string;
declare function writeToFileSync(filePath: string, content: string): void;

declare const utility_getFileName: typeof getFileName;
declare const utility_getFrontmatterAndMd: typeof getFrontmatterAndMd;
declare const utility_jsonStringify: typeof jsonStringify;
declare const utility_toSlug: typeof toSlug;
declare const utility_writeToFileSync: typeof writeToFileSync;
declare namespace utility {
  export { utility_getFileName as getFileName, utility_getFrontmatterAndMd as getFrontmatterAndMd, utility_jsonStringify as jsonStringify, utility_toSlug as toSlug, utility_writeToFileSync as writeToFileSync };
}

declare const metamark: {
    obsidian: {
        vault: {
            process: typeof obsidianVaultProcess;
        };
    };
    utility: typeof utility;
};

export { Metamark, metamark as default };
