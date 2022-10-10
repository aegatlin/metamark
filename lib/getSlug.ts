import slugify from '@sindresorhus/slugify'

export function getSlug(title: string): string {
  return slugify(title, { decamelize: true })
}
