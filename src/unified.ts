import { fromHtml } from "hast-util-from-html";
import { heading } from "hast-util-heading";
import { toText } from "hast-util-to-text";
import { Root } from "mdast";
import { toString } from "mdast-util-to-string";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import { Preset, unified } from "unified";
import { visit } from "unist-util-visit";
import { Metamark } from "./types";

function getMdastRoot(md: Mds): Root {
  return parse(md);
}

function parse(md: Mds): Root {
  return unified().use(remarkParse).use(remarkGfm).parse(md);
}

export function getHtml(md: Mds, preset: Preset): string {
  return processSyncToString(md, preset);
}

function processSyncToString(md: Mds, preset: Preset): string {
  return unified().use(preset).processSync(md).toString();
}

/**
 * `Mds` is a markdown string. It needs to be _just_ markdown. No
 * frontmatter/yaml.
 *
 * "# Hello\nI am markdown _content_\n"
 */
type Mds = string;

export function getFirstParagraphText(md: Mds): string {
  const mdast = getMdastRoot(md);

  const firstParagraph = mdast.children.find(
    (child) => child.type === "paragraph"
  );

  return toString(firstParagraph);
}

export function getText(md: Mds): string {
  const mdast = getMdastRoot(md);
  return toString(mdast);
}

export function getTocData(html: string): Metamark.TocItem[] {
  const hast = fromHtml(html);

  const flatToc: Metamark.TocItem[] = [];

  visit(hast, heading, (node: any) => {
    const tagName = node?.tagName;
    flatToc.push({
      title: toText(node),
      depth: parseInt(tagName?.at(1)) || -1,
      id: node?.properties?.id,
    });
  });

  return flatToc;
}
