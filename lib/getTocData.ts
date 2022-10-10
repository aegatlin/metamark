import { fromHtml } from 'hast-util-from-html'
import { heading } from 'hast-util-heading'
import { toText } from 'hast-util-to-text'
import { visit } from 'unist-util-visit'

export interface MetamarkTocItem {
  title: string
  depth: number
  id: string
}

export function getTocData(html: string): MetamarkTocItem[] {
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
