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
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { remarkWikiLinksToLinks } from 'remark-wiki-links-to-links'
import { unified } from 'unified'
import { visit } from 'unist-util-visit'

export interface MetamarkTocItem {
  title: string
  depth: number
  id: string
}

export interface Metamark {
  slug: string
  route: string
  toc: MetamarkTocItem[]
  firstParagraphText: string
  title: string
  frontmatter: any
  content: { html: string }
}

type Opts = {
  toSlug?: (title: string) => string
  toRoute?: (title: string) => string
}

let _toSlug = (title: string) => slugify(title)
let _toRoute = (title: string) => `/content/${_toSlug(title)}`

export function metamark(
  filePath: string,
  { toSlug, toRoute }: Opts = {}
): Metamark {
  if (toSlug) _toSlug = toSlug
  if (toRoute) _toRoute = toRoute

  const { name: title } = path.parse(filePath)
  const content = readFileSync(filePath, 'utf8')
  const { data: frontmatter, content: md } = matter(content)
  const mdast = getMdast(md)
  const html = getHtml(md)

  return {
    title,
    slug: _toSlug(title),
    route: _toRoute(title),
    frontmatter,
    firstParagraphText: getFirstParagraphText(mdast),
    toc: getTocFromHtml(html),
    content: { html },
  }
}

function getFirstParagraphText(mdast) {
  const firstParagraph = mdast.children.find(
    (child) => child.type === 'paragraph'
  )
  return toString(firstParagraph)
}

function getTocFromHtml(html): MetamarkTocItem[] {
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

function getMdast(md: string) {
  const processor = getMdastProcessor()
  const mdast = processor.parse(md)
  return processor.runSync(mdast)
}

function getHtml(md: string) {
  const processor = getHastProcessor()
  return processor.processSync(md).toString()
}

function getMdastProcessor() {
  return unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkWikiLinksToLinks, {
      toUri: (name) => _toRoute(name),
    })
}

function getHastProcessor() {
  return getMdastProcessor()
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, { behavior: 'wrap' })
    .use(rehypeHighlight, { languages: { elixir } })
    .use(rehypeStringify)
}
