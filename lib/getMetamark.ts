import { fstatSync, openSync, readFileSync } from 'node:fs'
import rehypeStringify from 'rehype-stringify'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'
import { getToc } from './getToc.js'
import { Metadata, Metamark } from './types.js'

function getHtml(md: string) {
  return unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeStringify)
    .processSync(md)
    .toString()
}

function getSlug(filePath: string): string {
  const lastOfPath = filePath.split('/').pop()
  const lastNoExt = lastOfPath.split('.').shift()
  return lastNoExt
}

export function getMetamark(filePath: string): Metamark {
  const fileDescriptor = openSync(filePath)
  const fileStats = fstatSync(fileDescriptor)
  const metadata: Metadata = {
    createdAt: fileStats.birthtime,
    updatedAt: fileStats.mtime,
    slug: getSlug(filePath),
  }

  const md = readFileSync(filePath, 'utf-8')
  const metamark: Metamark = {
    metadata,
    md,
    html: getHtml(md),
    toc: getToc(md),
  }

  return metamark
}
