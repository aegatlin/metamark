import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeExternalLinks from "rehype-external-links";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import callouts from "remark-callouts";
import remarkGfm from "remark-gfm";
import { remarkObsidianLink } from "remark-obsidian-link";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { Preset } from "unified";
import { Metamark } from "./types";
import elixir from "highlight.js/lib/languages/elixir.js";

export function unifiedPreset(config: Metamark.UnifiedConfig): Preset {
  if (isPreset(config)) return config;

  const preset: Preset = {
    plugins: [
      remarkParse,
      callouts,
      remarkGfm,
      [remarkObsidianLink, { toLink: config.remarkObsidianLink.toLink }],
      remarkRehype,
      [rehypeExternalLinks, { rel: ["nofollow"], target: "_blank" }],
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: "wrap" }],
      [rehypeHighlight, { languages: { elixir } }],
      rehypeStringify,
    ],
  };

  return preset;
}

function isPreset(config: Metamark.UnifiedConfig): config is Preset {
  return !!config?.plugins || !!config?.settings;
}
