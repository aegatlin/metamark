import slugify from "@sindresorhus/slugify";

export function toSlug(s: string): string {
  return slugify(s, { decamelize: false });
}
