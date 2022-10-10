import { getSlug } from './getSlug.js'
import {
  ObsidianLink,
  obsidianLinkBuilder as wikiLinkToObLink,
  ObsidianLinkType,
} from './obsidianLinkBuilder.js'

export interface WikiLink {
  value: string
  alias?: string
}

export interface Link {
  value: string
  uri: string
  title?: string
}

export type ToLink = (wikiLink: WikiLink) => Link | string
type ToUri = (x: { page?: string; header?: string }) => string

export function toLinkBuilder(pageAllowSet: Set<string>): ToLink {
  const toUri: ToUri = function ({ page, header }) {
    let headerPart = header ? `#${getSlug(header)}` : ''
    let pagePart = page ? `/content/${getSlug(page)}` : ''

    if (page && pageAllowSet.has(page)) {
      return header ? `${pagePart}${headerPart}` : pagePart
    }

    return header ? headerPart : ''
  }

  const toLink: ToLink = function (wikiLink) {
    const obLink = wikiLinkToObLink(wikiLink)
    const link = obLinkToLink(obLink, toUri)
    return link
  }

  return toLink
}

function obLinkToLink(oLink: ObsidianLink, toUri: ToUri): Link | string {
  switch (oLink.type) {
    case ObsidianLinkType.Page: {
      const { alias, page } = oLink
      const value = alias || page
      const uri = toUri({ page })
      return uri ? { value, uri } : value
    }
    case ObsidianLinkType.PageHeader: {
      const { alias, page, header } = oLink
      const value = alias || `${page}#${header}`
      const uri = toUri({ page, header })
      return uri ? { value, uri } : value
    }
    case ObsidianLinkType.PageBlock: {
      const { alias, page } = oLink
      const value = alias || page
      const uri = toUri({ page })
      return uri ? { value, uri } : value
    }
    case ObsidianLinkType.Header: {
      const { alias, header } = oLink
      const value = alias || header
      const uri = toUri({ header })
      return { value, uri }
    }
    case ObsidianLinkType.Block: {
      const { alias } = oLink
      return alias || ''
    }
  }
}
