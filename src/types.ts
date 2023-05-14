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
        frontmatter: Record<string, any>;
        html: string;
        toc: TocItem[];
      }

      export interface ProcessOptions {
        filePathAllowSetBuilder?: FilePathAllowSetBuilder;
        unifiedProcessorBuilder?: UnifiedProcessorBuilder;
        toLinkBuilderOpts?: ToLinkBuilderOpts;
      }

      export type FilePathAllowSetBuilder = (dirPath: string) => Set<string>;

      export type UnifiedProcessorBuilder = (_: {
        toLink: ToLink;
      }) => Processor<MdastRoot, HastRoot, HastRoot, string>;

      export type ToLinkBuilderOpts = {
        filePathAllowSet: Set<string>;
        toSlug: (s: string) => string;
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
