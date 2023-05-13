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
import elixir from "highlight.js/lib/languages/elixir";
import { toLink } from "./unified.utility";

export function defaultPreset(
  config: Metamark.Unified.DefaultPreset.Config
): Preset {
  const preset: Preset = {
    plugins: [
      remarkParse,
      remarkGfm,
      callouts,
      [remarkObsidianLink, { toLink: config.remarkObsidianLink.toLink }],
      remarkRehype,
      [rehypeExternalLinks, config.rehypeExternalLinks.options],
      rehypeSlug,
      [rehypeAutolinkHeadings, config.rehypeAutolinkHeadings.options],
      [rehypeHighlight, { languages: { elixir } }],
      rehypeStringify,
    ],
  };

  return preset;
}

export function buildDefaultPresetConfig(
  opts?: Metamark.Unified.DefaultPreset.Options
): Metamark.Unified.DefaultPreset.Config {
  return {
    remarkObsidianLink: opts?.remarkObsidianLink ?? defaultRemarkObsidianLink(),
    rehypeExternalLinks:
      opts?.rehypeExternalLinks ?? defaultRehypeExternalLinks(),
    rehypeAutolinkHeadings:
      opts?.rehypeAutolinkHeadings ?? defaultRehypeAutolinkHeadings(),
  };
}

function defaultRemarkObsidianLink(): Metamark.Unified.DefaultPreset.Config["remarkObsidianLink"] {
  return {
    toLink,
  };
}

function defaultRehypeExternalLinks(): Metamark.Unified.DefaultPreset.Config["rehypeExternalLinks"] {
  return {
    options: {},
  };
}

function defaultRehypeAutolinkHeadings(): Metamark.Unified.DefaultPreset.Config["rehypeAutolinkHeadings"] {
  return {
    options: { behavior: "wrap" },
  };
}