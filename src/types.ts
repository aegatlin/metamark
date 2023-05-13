import { Options as RehypeExternalLinksOptions } from "rehype-external-links";
import { Options as RehypeAutolinkHeadingsOptions } from "rehype-autolink-headings";
import { ToLink } from "remark-obsidian-link";
import { Preset } from "unified";

export namespace Metamark {
  export namespace File {
    export interface Data {
      fileName: string;
      slug: string;
      firstParagraphText: string;
      frontmatter: Record<string, any>;
      text: string;
      html: string;
      toc: TocItem[];
    }

    export interface Config {
      unifiedPreset: Preset;
    }

    export interface ProcessOptions {
      unified?: Unified.Options;
    }
  }

  export namespace Obsidian {
    export namespace Vault {
      export interface Data {
        filePaths: string[];
        pageAllowSet: Set<string>;
        pages: File.Data[];
      }

      export interface Config {
        shouldIncludeFile: (_: { frontmatter: Record<string, any> }) => boolean;
        unifiedPreset: Preset;
      }

      export interface ProcessOptions {
        shouldIncludeFile?: Config["shouldIncludeFile"];
        unified?: Unified.Options;
      }
    }
  }

  export namespace Unified {
    /**
     * A user can supply either their own `Preset`, or a subset/partial of
     * the default preset, aka `Metamark.Unified.DefaultPreset.Options`.
     */
    export type Options = Preset | DefaultPreset.Options;

    export namespace DefaultPreset {
      export interface Config {
        remarkObsidianLink: {
          toLink: ToLink;
        };
        /**
         * defaults to `{}`
         *
         * If you don't trust the sources you are linking to (e.g., they are user
         * defined), consider `rel=nofollow`. If you want to force users to open
         * links in new tabs, consider `target=_blank`.
         *
         * https://github.com/rehypejs/rehype-external-links
         */
        rehypeExternalLinks: {
          options: RehypeExternalLinksOptions;
        };
        /**
         * defaults to `{ behavior: "wrap" }`

         * https://github.com/rehypejs/rehype-autolink-headings
         */
        rehypeAutolinkHeadings: {
          options: RehypeAutolinkHeadingsOptions;
        };
      }

      export type Options = Partial<Config>;
    }
  }

  export interface TocItem {
    title: string;
    depth: number;
    id: string;
  }
}
