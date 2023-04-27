import slugify from "@sindresorhus/slugify";

export function getSlug(s: string): string {
  let str = slugify(s, { decamelize: false });
  str = str.replace(/([a-zA-Z\d]+)-([ts])(-|$)/g, "$1$2$3");
  return str;
}
