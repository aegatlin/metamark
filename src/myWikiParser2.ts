import { Plugin, Transformer } from 'unified';
import { Node } from 'unist';
import { Root } from 'mdast';
import { visit } from 'unist-util-visit';
import m from 'mdast-builder';
// import wikiLinkPlugin from '@portaljs/remark-wiki-link';
import wikiLinkPlugin from 'remark-wiki-link-plus';

// First, let's define our base types with proper documentation
interface WikiLink {
  value: string;
  alias?: string;
  heading?: string;
}

interface LinkResult {
  uri: string;
  title?: string;
  value: string;
}

// Define the options interface that matches the expected unified pattern
interface ObsidianLinkOptions {
  toLink?: (wikiLink: WikiLink) => LinkResult;
  toImage?: (wikiLink: WikiLink) => LinkResult;
  imageExtensions?: string[];
  debug?: boolean;
  pathFormat?: 'raw' | 'obsidian-absolute' | 'obsidian-short';
  permalinks?: string[];
  wikiLinkClassName?: string;
  newClassName?: string;
}

// Create a proper type for the attacher function
type WikiParserAttacher = Plugin<[ObsidianLinkOptions?]>;

// Define the default configuration
const DEFAULT_CONFIG: Required<ObsidianLinkOptions> = {
  imageExtensions: ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.bmp', '.ico', '.apng'],
  wikiLinkClassName: 'wiki-link',
  newClassName: 'new',
  pathFormat: 'obsidian-absolute',
  debug: false,
  permalinks: [],
  toLink: ({ value, alias, heading }) => ({
    uri: `/${value}${heading ? '#' + heading : ''}`,
    title: alias,
    value: alias || value
  }),
  toImage: ({ value, alias }) => ({
    uri: `/assets/${value}`,
    title: alias,
    value: alias || value
  })
};

// Create the attacher function with proper typing
const remarkWikiParser: WikiParserAttacher = function(options?: ObsidianLinkOptions) {
  // Merge options with defaults
  const config = { ...DEFAULT_CONFIG, ...options };
  
  // Configure the base wiki link plugin
  this.use(wikiLinkPlugin, {
    pathFormat: config.pathFormat,
    permalinks: config.permalinks,
    wikiLinkClassName: config.wikiLinkClassName,
    newClassName: config.newClassName,
    hrefTemplate: (permalink: string) => `/${permalink.replace(/^\//, '')}`
  });

  // Helper function to check for image paths
  const isImagePath = (path: string): boolean => {
    const normalized = path.toLowerCase();
    return config.imageExtensions.some(ext => normalized.endsWith(ext.toLowerCase()));
  };

  // Create the transformer function
  const transformer: Transformer<Root> = (tree) => {
    if (config.debug) {
      console.log('[WikiParser] Starting transformation');
    }

    visit(tree, 'wikiLink', (node: Node, index: number, parent: { children: Node[] } | null) => {
      if (!parent || typeof index !== 'number') {
        return;
      }

      try {
        const wikiLinkNode = node as { value: string; data?: { alias?: string } };
        const [path, heading] = wikiLinkNode.value.split('#');
        
        const wikiLink: WikiLink = {
          value: path.trim(),
          alias: wikiLinkNode.data?.alias,
          heading: heading?.trim()
        };

        // Choose the appropriate transform function
        const isImage = isImagePath(wikiLink.value);
        const transform = isImage ? config.toImage : config.toLink;
        
        // Apply the transformation
        const result = transform(wikiLink);
        
        // Create the new node
        const newNode = isImage
          ? m.image(result.uri, result.title || '', result.value)
          : m.link(result.uri, result.title, [m.text(result.value)]);

        // Add class names
        newNode.data = {
          hProperties: {
            class: [
              config.wikiLinkClassName,
              !config.permalinks.includes(wikiLink.value) ? config.newClassName : ''
            ].filter(Boolean).join(' ')
          }
        };

        // Replace the old node
        parent.children[index] = newNode;

      } catch (error) {
        if (config.debug) {
          console.error('[WikiParser] Error processing node:', error);
        }
      }
    });

    return tree;
  };

  return transformer;
};

export default remarkWikiParser;

// Export types for external use
export type {
  WikiLink,
  LinkResult,
  ObsidianLinkOptions
};