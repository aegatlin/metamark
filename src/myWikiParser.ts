import m from 'mdast-builder';
import remarkWikiLink from 'remark-wiki-link';
import { SKIP, visit } from 'unist-util-visit';

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

const defaultImageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp'];

export const myWikiParser = function (opts: ObsidianLinkOptions = {}) {
  const toLink = opts.toLink || (({ value, alias }) => alias || value);
  const toImage = opts.toImage || toLink;
  const imageExtensions = opts.imageExtensions || defaultImageExtensions;
  const debug = opts.debug || false;

  // Helper to check if a path ends with an image extension
  const isImagePath = (path: string): boolean => {
    const result = imageExtensions.some(ext => 
      path.toLowerCase().endsWith(ext.toLowerCase())
    );
    if (debug) {
      console.log(`[Debug] Checking if path "${path}" is an image:`, result);
      if (result) {
        console.log(`[Debug] Matched image extension:`, 
          imageExtensions.find(ext => path.toLowerCase().endsWith(ext.toLowerCase())));
      }
    }
    return result;
  };

  if (debug) {
    console.log('[Debug] Parser initialized with options:', {
      imageExtensions,
      hasCustomToLink: !!opts.toLink,
      hasCustomToImage: !!opts.toImage
    });
  }

  this.use(remarkWikiLink, { aliasDivider: '|' });

  return (tree: any) => {
    if (debug) {
      console.log('[Debug] Starting tree transformation');
    }

    visit(tree, 'wikiLink', (node, index, parent) => {
      const wValue = node.value;
      const wAlias = node.data.alias;
      
      if (debug) {
        console.log('[Debug] Processing wiki link:', {
          value: wValue,
          alias: wAlias,
          nodeType: node.type,
          parentType: parent.type
        });
      }

      const wikiLink = {
        value: wValue.trim(),
        alias: wAlias === wValue ? undefined : wAlias.trim(),
      };

      // Determine if this is an image link
      const isImage = isImagePath(wikiLink.value);
      const transform = isImage ? toImage : toLink;

      if (debug) {
        console.log('[Debug] Link transformation:', {
          isImage,
          transformType: isImage ? 'toImage' : 'toLink',
          wikiLink
        });
      }

      const link = transform(wikiLink);

      if (debug) {
        console.log('[Debug] Transform result:', {
          linkType: typeof link,
          link
        });
      }

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

      if (debug) {
        console.log('[Debug] Created new node:', {
          type: newNode.type,
          properties: newNode,
          replacedNodeType: node.type
        });
      }

      parent.children.splice(index, 1, newNode);
      return [SKIP, index];
    });

    if (debug) {
      console.log('[Debug] Completed tree transformation');
    }
  };
};

// Example usage with debug enabled:
/*
const processor = unified()
  .use(remarkParse)
  .use(myWikiParser, {
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