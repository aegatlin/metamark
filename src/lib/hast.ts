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



/**
 * Extracts plain text content from HTML, preserving paragraph structure for TTS models
 * @param htmlString The HTML string to extract text from
 * @returns Plain text content with paragraph breaks preserved
 */
export function getPlainText(htmlString: string): string {
  const hast: HastRoot = fromHtml(htmlString);
  let plainText = '';
  let lastNodeWasBlock = false;
  
  // Function to recursively extract text from nodes
  function extractText(node: any): void {
    // Skip script and style nodes entirely
    if (node.tagName === 'script' || node.tagName === 'style') {
      return;
    }
    
    // Check if this is a block-level element that should cause paragraph breaks
    const isBlockElement = node.tagName && [
      'p', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 
      'blockquote', 'pre', 'table', 'ul', 'ol', 'li',
      'section', 'article', 'header', 'footer'
    ].includes(node.tagName);
    
    // Add a newline before block elements (if we're not already at the start)
    if (isBlockElement && plainText.length > 0 && !lastNodeWasBlock) {
      plainText += '\n';
      lastNodeWasBlock = true;
    }
    
    // If this is a line break element, add a newline
    if (node.tagName === 'br') {
      plainText += '\n';
      lastNodeWasBlock = true;
      return;
    }
    
    // If this is a text node, add its value
    if (node.type === 'text') {
      plainText += node.value;
      lastNodeWasBlock = false;
    }
    
    // If the node has children, process them
    if (node.children && Array.isArray(node.children)) {
      for (const child of node.children) {
        extractText(child);
      }
    }
    
    // Add a newline after certain block elements
    if (isBlockElement) {
      plainText += '\n';
      lastNodeWasBlock = true;
    }
  }
  
  // Process the root node
  extractText(hast);
  
  // Clean up excessive whitespace while preserving paragraph structure
  return plainText
    .replace(/\n{3,}/g, '\n\n')  // Replace excessive newlines with double newlines
    .replace(/[ \t]+/g, ' ')     // Replace multiple spaces/tabs with a single space
    .trim();                     // Trim leading/trailing whitespace
}