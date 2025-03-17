import remarkParse from "remark-parse";
import { Metamark } from "../../../src/types";
import { unified } from "unified";

/**
 * Turns markdown into a mdast tree.
 */
export function fromMarkdown(markdown: string): Metamark.MdastRoot {
  const mdastRoot = unified().use(remarkParse).parse(markdown);
  return mdastRoot;
}
