import matter from "gray-matter";
import { nod, type Nod } from "../nod.js";
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
    fromFilePath(filePath: string, n: Nod = nod): Raw {
      return n.fs.readFileSync(filePath, "utf8");
    },
  },
  getMd: {
    fromRaw(raw: Raw): Md {
      const { content: md } = matter(raw);
      return md as Md;
    },
    fromFilePath(filePath: string): Md {
      const content = file.getRaw.fromFilePath(filePath);
      return file.getMd.fromRaw(content);
    },
  },
  getFm: {
    fromRaw(raw: Raw): Fm {
      const { data: fm } = matter(raw);
      return fm as Fm;
    },
    fromFilePath(filePath: string): Fm {
      const content = file.getRaw.fromFilePath(filePath);
      return file.getFm.fromRaw(content);
    },
  },
  getFileName(filePath: string, n: Nod = nod): string {
    const { name } = n.path.parse(filePath);
    return name;
  },
};
