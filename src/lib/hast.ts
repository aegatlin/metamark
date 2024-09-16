import { Root as HastRoot } from "hast";
import { fromHtml } from "hast-util-from-html";
import { heading } from "hast-util-heading";
import { toText } from "hast-util-to-text";
import { visit } from "unist-util-visit";
import { Metamark } from "../types";

function isHeading(node: unknown): boolean {
  return heading(node);
}

/**
 * This will determine at what header depths a header is,
 * e.g., 'h1' => 1, 'h2' => 2, etc.
 */
function getHeaderDepth(headerString: string): number {
  switch (headerString) {
    case "h1":
      return 1;
    case "h2":
      return 2;
    case "h3":
      return 3;
    case "h4":
      return 4;
    case "h5":
      return 5;
    case "h6":
      return 6;
    case "hgroup":
      return -1;
    default:
      return -1;
  }
}

export function getToc(htmlString: string): Metamark.TocItem[] {
  const hast: HastRoot = fromHtml(htmlString);
  const flatToc: Metamark.TocItem[] = [];

  visit(hast, isHeading, (node: unknown) => {
    // this is redundant to `isHeading` but has convenient type narrowing
    if (!heading(node)) throw "something bad";

    flatToc.push({
      id: node.properties.id?.toString() ?? "",
      title: toText(node),
      depth: getHeaderDepth(node.tagName),
    });
  });

  return flatToc;
}
