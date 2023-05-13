import matter from "gray-matter";
import fs from "node:fs";
import path from "node:path";

export function getFileName(filePath: string): string {
  const { name } = path.parse(filePath);
  return name;
}

export function getFrontmatterAndMd(filePath: string) {
  const raw = fs.readFileSync(filePath, "utf8");
  const { content, data } = matter(raw);
  return {
    md: content,
    frontmatter: data,
  };
}
