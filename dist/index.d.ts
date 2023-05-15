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
                filePathAllowSetBuilder?: FilePathAllowSetBuilder;
                unifiedProcessorBuilder?: UnifiedProcessorBuilder;
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
  export {
    utility_getFileName as getFileName,
    utility_getFrontmatterAndMd as getFrontmatterAndMd,
    utility_jsonStringify as jsonStringify,
    utility_toSlug as toSlug,
    utility_writeToFileSync as writeToFileSync,
  };
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
