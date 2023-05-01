import matter from "gray-matter";
import { nd, type Nd } from "../nd.js";
import { unified } from "../unified/index.js";

/**
 * `Raw` is the raw string of a file. It can
 * contain stringified frontmatter, markdown, etc.
 */
export type Raw = string;

/**
 * `Md` is a "true" md string, stripped of frontmatter,
 * etc.
 */
export type Md = string;

/**
 * `Fm` is frontmatter
 */
export type Fm = { [key: string]: any };

/**
 * Utilities for processing a single markdown file
 */
export const file = {
  getRaw: {
    /**
     * will deprecate `m.getRawMd`
     */
    fromFilePath(filePath: string, n: Nd = nd): Raw {
      return n.fs.readFileSync(filePath, "utf8");
    },
  },
  getMd: {
    /**
     * will deprecate `m.getMdNoFrontmatter`
     */
    fromContent(content: Raw): Md {
      const { content: md } = matter(content);
      return md as Md;
    },
    fromFilePath(filePath: string): Md {
      const content = file.getRaw.fromFilePath(filePath);
      return file.getMd.fromContent(content);
    },
  },
  getFm: {
    /** will deprecate `m.getFrontmatter` */
    fromContent(content: Raw): Fm {
      const { data: fm } = matter(content);
      return fm as Fm;
    },
    fromFilePath(filePath: string): Fm {
      const content = file.getRaw.fromFilePath(filePath);
      return file.getFm.fromContent(content);
    },
  },
  /** will deprecate `m.getPage` */
  getFileName(filePath: string, n: Nd = nd): string {
    const { name } = n.path.parse(filePath);
    return name;
  },
};
