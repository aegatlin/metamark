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
import { unified } from 'unified'
import { visit } from 'unist-util-visit'

export function metamark(filePath: string) {
  const { base, name, ext } = path.parse(filePath)
  const rawMd = readFileSync(filePath, 'utf8')
  const { data: frontmatter, content: md } = matter(rawMd)

  const mdast = getMdastFromMd(md)
  const hast = getHastFromMd(md)
  const html = getHtmlFromMd(md)

  return {
    file: { name, ext, base },
    title: name,
    slug: slugify(name),
    frontmatter,
    firstParagraphText: getFirstParagraphText(mdast),
    toc: getTocFromHtml(html),
    content: { rawMd, md, mdast, hast, html },
  }
}

function getFirstParagraphText(mdast) {
  const firstParagraph = mdast.children.find(
    (child) => child.type === 'paragraph'
  )
  return toString(firstParagraph)
}

function getTocFromHtml(html) {
  const hast = fromHtml(html)

  const flatToc = []

  visit(hast, heading, (node) => {
    const tagName = node?.tagName
    flatToc.push({
      title: toText(node),
      tagName,
      depth: parseInt(tagName?.at(1)) || -1,
      id: node?.properties?.id,
    })
  })

  return flatToc
}

function getMdastFromMd(md) {
  const mdastProcessor = unified().use(remarkParse).use(remarkGfm)

  const mdast = mdastProcessor.parse(md)

  return mdast
}

function getHastFromMd(md) {
  const hastProcessor = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, { behavior: 'wrap' })
    .use(rehypeHighlight, { languages: { elixir } })

  const hast = hastProcessor.parse(md)

  return hast
}

function getHtmlFromMd(md) {
  const html = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, { behavior: 'wrap' })
    .use(rehypeHighlight, { languages: { elixir } })
    .use(rehypeStringify)
    .processSync(md)
    .toString()

  return html
}
