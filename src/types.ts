import { Root as HastRoot } from "hast";
import { Root as MdastRoot } from "mdast";
import { Link, WikiLink as _WikiLink } from "remark-obsidian-link";
import { Processor } from "unified";

export namespace Metamark {
  export type MdastLink = Link;
  export type WikiLink = _WikiLink;

  export namespace Obsidian {
    export namespace Vault {
      export type BuildFilePathAllowSet = (dirPath: string) => Set<string>;

      export type BuildUnifiedProcessor = (
        filePathAllowSet: Set<string>
      ) => Processor<MdastRoot, HastRoot, HastRoot, string>;
      export interface FileData {
        fileName: string;
        slug: string;
        firstParagraphText: string;
        frontmatter: Record<string, any>;
        html: string;
        toc: TocItem[];
      }

      export interface ProcessOptions {
        buildFilePathAllowSet?: BuildFilePathAllowSet;
        buildUnifiedProcessor?: BuildUnifiedProcessor;
      }
    }
  }

  export interface TocItem {
    title: string;
    depth: number;
    id: string;
  }
}
