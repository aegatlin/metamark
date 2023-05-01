import { file } from "../file/index.js";
import { Fm, Md } from "../index.js";
import { unified } from "../unified/index.js";
import { getSlug } from "./getSlug.js";
import { MetamarkTocItem, getTocData } from "./getTocData.js";
import { presetBuilder } from "./presets.js";
import { GetPageUriBuilder, toLinkBuilder } from "./toLinkBuilder.js";

export interface GetMarksOptions {
  getPageUriBuilder?: GetPageUriBuilder;
}

export interface Mark {
  page: string;
  slug: string;
  toc: MetamarkTocItem[];
  firstParagraphText: string;
  frontmatter: { [key: string]: any };
  html: string;
  text: string;
}

/**
 * mark utilities
 */
export const mark = {
  getMark(
    filePath: string,
    pageAllowSet: Set<string>,
    options?: GetMarksOptions
  ) {
    const fileName = file.getFileName(filePath);
    const md: Md = file.getMd.fromFilePath(filePath);
    const fm: Fm = file.getFm.fromFilePath(filePath);
    const getPageUri =
      options?.getPageUriBuilder?.({ frontmatter: fm }) ?? undefined;
    const preset = presetBuilder({
      toLink: toLinkBuilder(pageAllowSet, getPageUri),
    });
    const html = unified.getHtml(md, preset);
    const mark: Mark = {
      page: fileName,
      slug: getSlug(fileName),
      toc: getTocData(html),
      firstParagraphText: unified.getFirstParagraphText(md),
      frontmatter: fm,
      html,
      text: unified.getText(md),
    };
    return mark;
  },
  getMarks(
    filePathList: string[],
    pageAllowSet: Set<string>,
    options?: GetMarksOptions
  ): Mark[] {
    const marks = [];
    for (const filePath of filePathList) {
      const page = file.getFileName(filePath);
      if (pageAllowSet.has(page)) {
        marks.push(mark.getMark(filePath, pageAllowSet, options));
      }
    }

    return marks;
  },
};
