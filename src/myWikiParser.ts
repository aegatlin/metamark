import { Plugin, Transformer } from 'unified';
import { Node } from 'unist';
import { Root } from 'mdast';
import { SKIP, visit } from 'unist-util-visit';
import m from 'mdast-builder';
import wikiLinkPlugin from '@portaljs/remark-wiki-link';

// Core interfaces that define our type structure
interface WikiLink {
  value: string;
  alias?: string;
}

interface LinkResult {
  uri: string;
  title?: string;
  value: string;
}

interface ObsidianLinkOptions {
  toLink?: (wikiLink: WikiLink) => string | LinkResult;
  toImage?: (wikiLink: WikiLink) => string | LinkResult;
  imageExtensions?: string[];
  debug?: boolean;
}

// Extended Node type for wiki links
interface WikiLinkNode extends Node {
  type: 'wikiLink';
  value: string;
  data?: {
    alias?: string;
    permalink?: string;
  };
  alias?: string;
}

// Default configuration
const defaultImageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp'];

// Create a debug logger
const createLogger = (isEnabled: boolean) => ({
  log: (message: string, data?: any) => {
    if (isEnabled) {
      console.log(`[Debug] ${message}`, data ? data : '');
    }
  },
  error: (message: string, error?: any) => {
    if (isEnabled) {
      console.error(`[Error] ${message}`, error ? error : '');
    }
  }
});

// Helper to normalize node structure
const normalizeNode = (node: WikiLinkNode): WikiLinkNode => {
  if (!node.data) {
    node.data = {};
  }
  if (!node.data.alias && node.alias) {
    node.data.alias = node.alias;
  }
  return node;
};

// Main plugin function with proper unified Plugin typing
export const remarkWikiParser: Plugin<[ObsidianLinkOptions?], Root> = function(opts: ObsidianLinkOptions = {}) {
  // Initialize configuration
  const toLink = opts.toLink || (({ value, alias }) => alias || value);
  const toImage = opts.toImage || toLink;
  const imageExtensions = opts.imageExtensions || defaultImageExtensions;
  const logger = createLogger(opts.debug || false);

  // Helper to check for image paths
  const isImagePath = (path: string): boolean => {
    const result = imageExtensions.some(ext => 
      path.toLowerCase().endsWith(ext.toLowerCase())
    );
    logger.log(`Path "${path}" is image:`, result);
    return result;
  };

  // Configure wiki link plugin
  this.use(wikiLinkPlugin, {
    pathFormat: "obsidian-absolute",
    aliasDivider: '|',
    wikiLinkClassName: 'wiki-link',
    newClassName: 'new',
    hrefTemplate: (permalink: string) => `/${permalink}`
  });

  // Return transformer function
  const transformer: Transformer<Root> = (tree) => {
    logger.log('Starting transformation');

    visit(tree, 'wikiLink', (node: WikiLinkNode, index: number, parent: any) => {
      try {
        // Normalize and process node
        const normalizedNode = normalizeNode(node);
        const wValue = normalizedNode.value;
        const wAlias = normalizedNode.data?.alias || wValue;

        const wikiLink = {
          value: wValue.trim(),
          alias: wAlias === wValue ? undefined : wAlias.trim(),
        };

        // Transform based on type
        const isImage = isImagePath(wikiLink.value);
        const transform = isImage ? toImage : toLink;
        const link = transform(wikiLink);

        // Create appropriate node
        let newNode;
        if (typeof link === 'string') {
          newNode = isImage 
            ? m.image(link, wikiLink.alias || '')
            : m.text(link);
        } else {
          newNode = isImage
            ? m.image(link.uri, link.title || '', link.value)
            : m.link(link.uri, link.title, [m.text(link.value)]);
        }

        // Replace old node
        parent.children.splice(index, 1, newNode);
        return [SKIP, index];
      } catch (error) {
        logger.error('Processing error:', error);
        return [SKIP, index];
      }
    });

    return tree;
  };

  return transformer;
};

// Example usage:
/*
import { unified } from 'unified';
import remarkParse from 'remark-parse';

const processor = unified()
  .use(remarkParse)
  .use(remarkWikiParser, {
    toLink: ({ value, alias }) => ({
      uri: `/notes/${value.toLowerCase().replace(/ /g, '-')}`,
      title: alias,
      value: alias || value
    }),
    toImage: ({ value, alias }) => ({
      uri: `/assets/${value}`,
      title: alias,
      value: alias || value
    }),
    imageExtensions: ['.png', '.jpg', '.jpeg', '.gif'],
    debug: true
  });
*/