import { ToLink } from "remark-obsidian-link";
import { Preset } from "unified";

export namespace Metamark {
  export interface File {
    fileName: string;
    slug: string;
    firstParagraphText: string;
    frontmatter: Record<string, any>;
    text: string;
    html: string;
    toc: TocItem[];
  }

  export interface FileConfig {
    unifiedConfig: UnifiedConfig;
  }

  export namespace Obsidian {
    export interface Vault {
      filePaths: string[];
      pageAllowSet: Set<string>;
      config: VaultConfig;
    }

    export interface VaultConfig {
      shouldIncludeFile: (_: { frontmatter: Record<string, any> }) => boolean;
      unifiedConfig: UnifiedConfig;
    }
  }

  export type UnifiedConfig = Preset | UnifiedDefaultPresetConfig;

  export interface UnifiedDefaultPresetConfig {
    remarkObsidianLink: {
      toLink: ToLink;
    };
    rehypeExternalLinks: {
      shouldOpenInNewTab: boolean;
    };
  }

  export interface TocItem {
    title: string;
    depth: number;
    id: string;
  }
}
