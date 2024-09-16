import { Root as MdastRoot, Paragraph } from "mdast";
import { toString } from "mdast-util-to-string";

export function getFirstParagraphText(
  mdastRoot: MdastRoot
): string | undefined {
  const paragraph = mdastRoot.children.find(
    (child) => child.type == "paragraph"
  );

  return paragraph ? toString(paragraph) : undefined;
}
