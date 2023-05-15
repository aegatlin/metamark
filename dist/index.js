var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/obsidian.vault.process.ts
import slugify2 from "@sindresorhus/slugify";
import matter2 from "gray-matter";
import { fromHtml } from "hast-util-from-html";
import { heading } from "hast-util-heading";
import { toText } from "hast-util-to-text";

// node_modules/highlight.js/es/languages/elixir.js
function elixir(hljs) {
  const regex = hljs.regex;
  const ELIXIR_IDENT_RE = "[a-zA-Z_][a-zA-Z0-9_.]*(!|\\?)?";
  const ELIXIR_METHOD_RE = "[a-zA-Z_]\\w*[!?=]?|[-+~]@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\]=?";
  const KEYWORDS = [
    "after",
    "alias",
    "and",
    "case",
    "catch",
    "cond",
    "defstruct",
    "defguard",
    "do",
    "else",
    "end",
    "fn",
    "for",
    "if",
    "import",
    "in",
    "not",
    "or",
    "quote",
    "raise",
    "receive",
    "require",
    "reraise",
    "rescue",
    "try",
    "unless",
    "unquote",
    "unquote_splicing",
    "use",
    "when",
    "with|0"
  ];
  const LITERALS = [
    "false",
    "nil",
    "true"
  ];
  const KWS = {
    $pattern: ELIXIR_IDENT_RE,
    keyword: KEYWORDS,
    literal: LITERALS
  };
  const SUBST = {
    className: "subst",
    begin: /#\{/,
    end: /\}/,
    keywords: KWS
  };
  const NUMBER = {
    className: "number",
    begin: "(\\b0o[0-7_]+)|(\\b0b[01_]+)|(\\b0x[0-9a-fA-F_]+)|(-?\\b[0-9][0-9_]*(\\.[0-9_]+([eE][-+]?[0-9]+)?)?)",
    relevance: 0
  };
  const ESCAPES_RE = /\\[\s\S]/;
  const BACKSLASH_ESCAPE = {
    match: ESCAPES_RE,
    scope: "char.escape",
    relevance: 0
  };
  const SIGIL_DELIMITERS = `[/|([{<"']`;
  const SIGIL_DELIMITER_MODES = [
    {
      begin: /"/,
      end: /"/
    },
    {
      begin: /'/,
      end: /'/
    },
    {
      begin: /\//,
      end: /\//
    },
    {
      begin: /\|/,
      end: /\|/
    },
    {
      begin: /\(/,
      end: /\)/
    },
    {
      begin: /\[/,
      end: /\]/
    },
    {
      begin: /\{/,
      end: /\}/
    },
    {
      begin: /</,
      end: />/
    }
  ];
  const escapeSigilEnd = (end) => {
    return {
      scope: "char.escape",
      begin: regex.concat(/\\/, end),
      relevance: 0
    };
  };
  const LOWERCASE_SIGIL = {
    className: "string",
    begin: "~[a-z](?=" + SIGIL_DELIMITERS + ")",
    contains: SIGIL_DELIMITER_MODES.map((x) => hljs.inherit(
      x,
      { contains: [
        escapeSigilEnd(x.end),
        BACKSLASH_ESCAPE,
        SUBST
      ] }
    ))
  };
  const UPCASE_SIGIL = {
    className: "string",
    begin: "~[A-Z](?=" + SIGIL_DELIMITERS + ")",
    contains: SIGIL_DELIMITER_MODES.map((x) => hljs.inherit(
      x,
      { contains: [escapeSigilEnd(x.end)] }
    ))
  };
  const REGEX_SIGIL = {
    className: "regex",
    variants: [
      {
        begin: "~r(?=" + SIGIL_DELIMITERS + ")",
        contains: SIGIL_DELIMITER_MODES.map((x) => hljs.inherit(
          x,
          {
            end: regex.concat(x.end, /[uismxfU]{0,7}/),
            contains: [
              escapeSigilEnd(x.end),
              BACKSLASH_ESCAPE,
              SUBST
            ]
          }
        ))
      },
      {
        begin: "~R(?=" + SIGIL_DELIMITERS + ")",
        contains: SIGIL_DELIMITER_MODES.map(
          (x) => hljs.inherit(
            x,
            {
              end: regex.concat(x.end, /[uismxfU]{0,7}/),
              contains: [escapeSigilEnd(x.end)]
            }
          )
        )
      }
    ]
  };
  const STRING = {
    className: "string",
    contains: [
      hljs.BACKSLASH_ESCAPE,
      SUBST
    ],
    variants: [
      {
        begin: /"""/,
        end: /"""/
      },
      {
        begin: /'''/,
        end: /'''/
      },
      {
        begin: /~S"""/,
        end: /"""/,
        contains: []
        // override default
      },
      {
        begin: /~S"/,
        end: /"/,
        contains: []
        // override default
      },
      {
        begin: /~S'''/,
        end: /'''/,
        contains: []
        // override default
      },
      {
        begin: /~S'/,
        end: /'/,
        contains: []
        // override default
      },
      {
        begin: /'/,
        end: /'/
      },
      {
        begin: /"/,
        end: /"/
      }
    ]
  };
  const FUNCTION = {
    className: "function",
    beginKeywords: "def defp defmacro defmacrop",
    end: /\B\b/,
    // the mode is ended by the title
    contains: [
      hljs.inherit(hljs.TITLE_MODE, {
        begin: ELIXIR_IDENT_RE,
        endsParent: true
      })
    ]
  };
  const CLASS = hljs.inherit(FUNCTION, {
    className: "class",
    beginKeywords: "defimpl defmodule defprotocol defrecord",
    end: /\bdo\b|$|;/
  });
  const ELIXIR_DEFAULT_CONTAINS = [
    STRING,
    REGEX_SIGIL,
    UPCASE_SIGIL,
    LOWERCASE_SIGIL,
    hljs.HASH_COMMENT_MODE,
    CLASS,
    FUNCTION,
    { begin: "::" },
    {
      className: "symbol",
      begin: ":(?![\\s:])",
      contains: [
        STRING,
        { begin: ELIXIR_METHOD_RE }
      ],
      relevance: 0
    },
    {
      className: "symbol",
      begin: ELIXIR_IDENT_RE + ":(?!:)",
      relevance: 0
    },
    {
      // Usage of a module, struct, etc.
      className: "title.class",
      begin: /(\b[A-Z][a-zA-Z0-9_]+)/,
      relevance: 0
    },
    NUMBER,
    {
      className: "variable",
      begin: "(\\$\\W)|((\\$|@@?)(\\w+))"
    }
    // -> has been removed, capnproto always uses this grammar construct
  ];
  SUBST.contains = ELIXIR_DEFAULT_CONTAINS;
  return {
    name: "Elixir",
    aliases: [
      "ex",
      "exs"
    ],
    keywords: KWS,
    contains: ELIXIR_DEFAULT_CONTAINS
  };
}

// src/obsidian.vault.process.ts
import { toString } from "mdast-util-to-string";
import fs2 from "fs";
import path2 from "path";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeExternalLinks from "rehype-external-links";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkCallouts from "remark-callouts";
import remarkGfm from "remark-gfm";
import { remarkObsidianLink } from "remark-obsidian-link";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { visit } from "unist-util-visit";

// src/utility.ts
var utility_exports = {};
__export(utility_exports, {
  getFileName: () => getFileName,
  getFrontmatterAndMd: () => getFrontmatterAndMd,
  jsonStringify: () => jsonStringify,
  toSlug: () => toSlug,
  writeToFileSync: () => writeToFileSync
});
import slugify from "@sindresorhus/slugify";
import matter from "gray-matter";
import fs from "fs";
import path from "path";
function toSlug(s) {
  return slugify(s, { decamelize: false });
}
function getFileName(filePath) {
  const { name } = path.parse(filePath);
  return name;
}
function getFrontmatterAndMd(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  const { content, data } = matter(raw);
  return {
    md: content,
    frontmatter: data
  };
}
function jsonStringify(o) {
  return JSON.stringify(o, null, 2);
}
function writeToFileSync(filePath, content) {
  fs.writeFileSync(filePath, content, "utf8");
}

// src/obsidian.vault.toLinkBuilder.ts
var toLinkBuilder = ({ filePathAllowSet, toSlug: toSlug2, prefix }) => (wikiLink) => {
  const uriOpts = { toSlug: toSlug2, prefix };
  const obsidianLink = wikiToObsidian(wikiLink);
  switch (obsidianLink.type) {
    case "page":
    case "page-header":
    case "page-block": {
      const pageNameAllowSet = new Set(
        Array.from(filePathAllowSet).map((filePath) => getFileName(filePath))
      );
      return pageNameAllowSet.has(obsidianLink.page) ? obsidianLinkToMdastLink(obsidianLink, uriOpts) : toMdastValue(obsidianLink);
    }
    case "header":
      return obsidianLinkToMdastLink(obsidianLink, uriOpts);
    case "block":
      return toMdastValue(obsidianLink);
    default:
      const _exhaustiveCheck = obsidianLink;
      return obsidianLink;
  }
};
function obsidianLinkToMdastLink(obsidianLink, uriOpts) {
  return {
    value: toMdastValue(obsidianLink),
    uri: toMdastUri(obsidianLink, uriOpts)
  };
}
function toMdastUri(ol, { toSlug: toSlug2, prefix }) {
  switch (ol.type) {
    case "page":
      return `${prefix}/${toSlug2(ol.page)}`;
    case "page-header":
      return `${prefix}/${toSlug2(ol.page)}#${toSlug2(ol.header)}`;
    case "page-block":
      return `${prefix}/${toSlug2(ol.page)}`;
    case "header":
      return `#${toSlug2(ol.header)}`;
    case "block":
      return "";
  }
}
function toMdastValue(ol) {
  if (ol?.alias)
    return ol.alias;
  switch (ol.type) {
    case "page":
      return `${ol.page}`;
    case "page-header":
      return `${ol.page}#${ol.header}`;
    case "page-block":
      return `${ol.page}`;
    case "header":
      return `#${ol.header}`;
    case "block":
      return `#^${ol.block}`;
    default:
      const _exhaustiveCheck = ol;
      return ol;
  }
}
function wikiToObsidian(wikiLink) {
  const { value, alias } = wikiLink;
  switch (true) {
    case Regex.BlockOnly.test(value): {
      let blockOnly = {
        type: "block",
        block: value.slice(2)
      };
      if (alias)
        blockOnly.alias = alias;
      return blockOnly;
    }
    case Regex.HeaderOnly.test(value): {
      let headerOnly = {
        type: "header",
        header: value.slice(1)
      };
      if (alias)
        headerOnly.alias = alias;
      return headerOnly;
    }
    case Regex.PageAndBlock.test(value): {
      const [page, block] = value.split("#^");
      let pageAndBlock = {
        type: "page-block",
        page,
        block
      };
      if (alias)
        pageAndBlock.alias = alias;
      return pageAndBlock;
    }
    case Regex.PageAndHeader.test(value): {
      const [page, header] = value.split("#");
      let pageAndHeader = {
        type: "page-header",
        page,
        header
      };
      if (alias)
        pageAndHeader.alias = alias;
      return pageAndHeader;
    }
    default: {
      let page = {
        type: "page",
        page: value
      };
      if (alias)
        page.alias = alias;
      return page;
    }
  }
}
var Regex = {
  // test for alias
  // Alias: /.+\|.+/,
  // test for starting with a header, so "header only" the test is testing for
  // NOT a block. I.e., anything not-block-like is a header
  HeaderOnly: /^#[^\^]+/,
  // test for starting with a header-block (e.g., #^block),
  // so "block only"
  BlockOnly: /^#\^.+/,
  // test for normal link with a header (i.e., does not have a block)
  PageAndHeader: /.+#[^\^]+/,
  // test for normal link with a block (this excludes the header as an option)
  PageAndBlock: /.+#\^.+/
};

// src/obsidian.vault.process.ts
function obsidianVaultProcess(dirPath, opts) {
  const filePathAllowSet = opts?.filePathAllowSetBuilder?.(dirPath) ?? defaultFilePathAllowSetBuilder(dirPath);
  const toLink = toLinkBuilder(
    opts?.toLinkBuilderOpts ?? {
      filePathAllowSet,
      toSlug: src_default.utility.toSlug,
      prefix: "/content"
    }
  );
  const processor = unifiedProcessorBuilder({ toLink });
  const pages = [];
  for (const filePath of filePathAllowSet) {
    const { name: fileName } = path2.parse(filePath);
    const raw = fs2.readFileSync(filePath, "utf8");
    const { content: md, data: frontmatter } = matter2(raw);
    const mdastRoot = processor.parse(md);
    const htmlString = processor.processSync(md).toString();
    const firstParagraph = mdastRoot.children.find(
      (child) => child.type === "paragraph"
    );
    const firstParagraphText = toString(firstParagraph);
    const hast = fromHtml(htmlString);
    const flatToc = [];
    visit(hast, heading, (node) => {
      const tagName = node?.tagName;
      flatToc.push({
        title: toText(node),
        depth: parseInt(tagName?.at(1)) || -1,
        id: node?.properties?.id
      });
    });
    const file = {
      fileName,
      slug: slugify2(fileName, { decamelize: false }),
      frontmatter,
      firstParagraphText,
      html: htmlString,
      toc: flatToc
    };
    pages.push(file);
  }
  return pages;
}
var unifiedProcessorBuilder = ({ toLink }) => {
  return unified().use(remarkParse).use(remarkGfm).use(remarkObsidianLink, { toLink }).use(remarkCallouts).use(remarkRehype).use(rehypeExternalLinks).use(rehypeSlug).use(rehypeAutolinkHeadings, { behavior: "wrap" }).use(rehypeHighlight, { languages: { elixir } }).use(rehypeStringify);
};
var defaultFilePathAllowSetBuilder = (dirPath) => {
  const dirEntries = fs2.readdirSync(dirPath, { withFileTypes: true });
  const filePathAllowSet = /* @__PURE__ */ new Set();
  dirEntries.forEach((dirEntry) => {
    if (dirEntry.isFile()) {
      const filePath = path2.join(dirPath, dirEntry.name);
      const raw = fs2.readFileSync(filePath, "utf8");
      const { data: frontmatter } = matter2(raw);
      if (!!frontmatter?.public) {
        filePathAllowSet.add(filePath);
      }
    }
  });
  return filePathAllowSet;
};

// src/index.ts
var metamark = {
  obsidian: {
    vault: {
      process: obsidianVaultProcess
    }
  },
  utility: utility_exports
};
var src_default = metamark;
export {
  src_default as default
};
