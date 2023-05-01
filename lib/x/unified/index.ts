import { toString } from "mdast-util-to-string";
import remarkGfm from "remark-gfm";
import { remarkObsidianLink } from "remark-obsidian-link";
import remarkParse from "remark-parse";
import { Preset, unified as u } from "unified";
import { Md } from "../index.js";
import { Root } from "mdast";

export const unified = {
  /**
   * will deprecates `m.getFirstParagraphText`
   */
  getFirstParagraphText(md: Md): string {
    const mdast = getMdastRoot(md);

    const firstParagraph = mdast.children.find(
      (child) => child.type === "paragraph"
    );

    return toString(firstParagraph);
  },
  /**
   * will deprecate `m.toHtml`
   */
  getHtml(md: Md, preset: Preset): string {
    return u().use(preset).processSync(md).toString();
  },
  getText(md: Md): string {
    const mdast = getMdastRoot(md);
    return toString(mdast);
  },
};

function getMdastRoot(md: Md): Root {
  const mdast = u()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkObsidianLink)
    .parse(md);

  return mdast;
}
