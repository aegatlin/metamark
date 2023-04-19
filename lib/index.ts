import { readFileSync } from 'fs'
import matter from 'gray-matter'
import { toString } from 'mdast-util-to-string'
import path from 'path'
import remarkGfm from 'remark-gfm'
import { remarkObsidianLink } from 'remark-obsidian-link'
import remarkParse from 'remark-parse'
import { Preset, unified } from 'unified'
import { getSlug } from './getSlug.js'
import { getTocData, MetamarkTocItem } from './getTocData.js'
import { preset, presetBuilder } from './presets.js'
import {GetPageUriBuilder, toLinkBuilder} from './toLinkBuilder.js'

function getFrontmatter(rawMd: string): { [key: string]: any } {
  const { data: frontmatter } = matter(rawMd)
  return frontmatter
}

function getFirstParagraphText(md: string): string {
  const mdast = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkObsidianLink)
    .parse(md)

  const firstParagraph = mdast.children.find(
    (child) => child.type === 'paragraph'
  )
  return toString(firstParagraph)
}

function toText(md: string): string {
  const mdast = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkObsidianLink)
    .parse(md)

  return toString(mdast)
}

function toHtml(md: string, preset: Preset): string {
  return unified().use(preset).processSync(md).toString()
}

function getPage(filePath: string): string {
  const { name: page } = path.parse(filePath)
  return page
}

function getRawMd(filePath: string): string {
  return readFileSync(filePath, 'utf8')
}

function getMdNoFrontmatter(rawMd: string): string {
  const { content: md } = matter(rawMd)
  return md
}

export interface  GetMarksOptions {
  getPageUriBuilder?: GetPageUriBuilder
}

export interface Mark {
  page: string
  slug: string
  toc: MetamarkTocItem[]
  firstParagraphText: string
  frontmatter: { [key: string]: any }
  html: string
  text: string
}

function getMark(filePath: string, pageAllowSet: Set<string>, options?: GetMarksOptions): Mark {
  const rawMd = getRawMd(filePath)
  const page = getPage(filePath)
  const md = getMdNoFrontmatter(rawMd)
  const frontmatter = getFrontmatter(rawMd);
  const getPageUri = options?.getPageUriBuilder?.({ frontmatter }) ?? undefined;
  const preset = presetBuilder({ toLink: toLinkBuilder(pageAllowSet, getPageUri) })
  const html = toHtml(md, preset)

  return {
    page,
    slug: getSlug(page),
    toc: getTocData(html),
    firstParagraphText: getFirstParagraphText(md),
    frontmatter,
    html,
    text: toText(md),
  }
}

function getMarks(filePathList: string[], pageAllowSet: Set<string>, options?: GetMarksOptions): Mark[] {
  const marks = []

  for (const filePath of filePathList) {
    const page = getPage(filePath)
    if (pageAllowSet.has(page)) {
      marks.push(getMark(filePath, pageAllowSet, options))
    }
  }

  return marks
}

export const Metamark = {
  getFirstParagraphText,
  getFrontmatter,
  getMark,
  getMarks,
  getMdNoFrontmatter,
  getRawMd,
  getSlug,
  getPage,
  getTocData,
  preset,
  presetBuilder,
  toHtml,
  toText,
}
