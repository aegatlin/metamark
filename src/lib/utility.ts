import slugify from "@sindresorhus/slugify";
import matter from "gray-matter";
import fs from "node:fs";
import path from "node:path";

export function toSlug(s: string): string {
  return slugify(s, { decamelize: false });
}

export function getFileName(filePath: string): string {
  const { name } = path.parse(filePath);
  return name;
}

export function jsonStringify(o: any): string {
  return JSON.stringify(o, null, 2);
}

export function writeToFileSync(filePath: string, content: string) {
  fs.writeFileSync(filePath, content, "utf8");
}
