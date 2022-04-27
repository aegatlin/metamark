import { Link, List, ListItem, Paragraph, Text } from 'mdast'
import { toc } from 'mdast-util-toc'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import { unified } from 'unified'
import { Toc, TocItem } from './types'

function getMdast(md) {
  return unified().use(remarkParse).use(remarkGfm).parse(md)
}

export function getToc(md: string) {
  try {
    const mdast = getMdast(md)
    const mdastToc = toc(mdast)
    const h1ListItem = mdastToc.map.children[0]
    const h2List = h1ListItem.children[1]
    return listToToc(h2List as List)
  } catch {
    return []
  }
}

function linkTextToTocItem(link: Link): TocItem {
  const text = link.children[0] as Text
  return {
    title: text.value,
    url: link.url,
  }
}

function paragraphLinkToTocItem(p: Paragraph): TocItem {
  return linkTextToTocItem(p.children[0] as Link)
}

function paragraphLinkListItemToTocItem(listItem: ListItem): TocItem {
  return paragraphLinkToTocItem(listItem.children[0] as Paragraph)
}

function isParagraph(x: any): boolean {
  return x.type == 'paragraph'
}

function isLink(x: any): boolean {
  return x.type == 'link'
}

function isParagraphLink(x: any): boolean {
  return isParagraph(x) && x.children.length == 1 && isLink(x.children[0])
}

function isParagraphLinkListItem(listItem: ListItem): boolean {
  return listItem.children.length == 1 && isParagraphLink(listItem.children[0])
}

function isList(x: any) {
  return x.type == 'list'
}

function hasSubToc(listItem: ListItem) {
  return (
    listItem.children.length == 2 &&
    isParagraphLink(listItem.children[0]) &&
    isList(listItem.children[1])
  )
}

function listItemToTocItem(listItem: ListItem): TocItem {
  if (isParagraphLinkListItem(listItem))
    return paragraphLinkListItemToTocItem(listItem)

  if (hasSubToc(listItem)) {
    const [paragraphLink, subTocList] = listItem.children
    const tocItem = paragraphLinkToTocItem(paragraphLink as Paragraph)
    const subToc = listToToc(subTocList as List)
    return { ...tocItem, children: subToc }
  }
}

function listToToc(list: List): Toc {
  return list.children.map(listItemToTocItem)
}
