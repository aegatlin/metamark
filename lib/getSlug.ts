import slugify from '@sindresorhus/slugify'

export function getSlug(s: string): string {
  return slugify(s, { decamelize: true })
}
