import slugify from '@sindresorhus/slugify'
import { readFileSync } from 'fs'
import matter from 'gray-matter'
import { fromHtml } from 'hast-util-from-html'
import { heading } from 'hast-util-heading'
import { toText } from 'hast-util-to-text'
import elixir from 'highlight.js/lib/languages/elixir'
import { toString } from 'mdast-util-to-string'
import path from 'path'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'
import rehypeStringify from 'rehype-stringify'
import remarkGfm from 'remark-gfm'
import { remarkObsidianLink } from 'remark-obsidian-link'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { Preset, unified } from 'unified'
import { visit } from 'unist-util-visit'

export interface MetamarkTocItem {
  title: string
  depth: number
  id: string
}

const preset: Preset = {
  plugins: [
    remarkParse,
    remarkGfm,
    remarkObsidianLink,
    remarkRehype,
    rehypeSlug,
    [rehypeAutolinkHeadings, { behavior: 'wrap' }],
    [rehypeHighlight, { languages: { elixir } }],
    rehypeStringify,
  ],
}

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

function getTocData(html: string): MetamarkTocItem[] {
  const hast = fromHtml(html)

  const flatToc: MetamarkTocItem[] = []

  visit(hast, heading, (node) => {
    const tagName = node?.tagName
    flatToc.push({
      title: toText(node),
      depth: parseInt(tagName?.at(1)) || -1,
      id: node?.properties?.id,
    })
  })

  return flatToc
}

function toHtml(md: string): string {
  return unified().use(preset).processSync(md).toString()
}

function toTitle(filePath: string): string {
  const { name: title } = path.parse(filePath)
  return title
}

function toSlug(title: string): string {
  return slugify(title)
}

function getRawMd(filePath: string): string {
  return readFileSync(filePath, 'utf8')
}

function getMdNoFrontmatter(rawMd: string): string {
  const { content: md } = matter(rawMd)
  return md
}

function all(filePath: string): {
  title: string
  slug: string
  toc: MetamarkTocItem[]
  firstParagraphText: string
  frontmatter: { [key: string]: any }
  html: string
} {
  const rawMd = getRawMd(filePath)
  const md = getMdNoFrontmatter(rawMd)
  const html = toHtml(md)

  const title = toTitle(filePath)

  return {
    title,
    slug: toSlug(title),
    toc: getTocData(html),
    firstParagraphText: getFirstParagraphText(md),
    frontmatter: getFrontmatter(rawMd),
    html: toHtml(md),
  }
}

export const Metamark = {
  preset,
  getRawMd,
  getMdNoFrontmatter,
  getTocData,
  getFirstParagraphText,
  getFrontmatter,
  toHtml,
  toTitle,
  toSlug,
  all,
}
