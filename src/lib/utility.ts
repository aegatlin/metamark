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

export function getFrontmatterAndMd(filePath: string) {
  const raw = fs.readFileSync(filePath, "utf8");
  const { content, data } = matter(raw);
  return {
    md: content,
    frontmatter: data,
  };
}

export function jsonStringify(o: any): string {
  return JSON.stringify(o, null, 2);
}

export function writeToFileSync(filePath: string, content: string) {
  fs.writeFileSync(filePath, content, "utf8");
}

/**
 * collects filePaths in a flat string array
 */
export function traverseVault(vaultDirPath: string): string[] {
  return traverseDirectoryRecursively(vaultDirPath);
}

function traverseDirectoryRecursively(dirPath: string): string[] {
  const dirEntries = fs.readdirSync(dirPath, { withFileTypes: true });
  const collection: string[] = [];

  dirEntries.forEach((dirEntry) => {
    const entryPath = path.join(dirEntry.parentPath, dirEntry.name);

    if (dirEntry.isFile()) {
      collection.push(entryPath);
    } else if (dirEntry.isDirectory()) {
      const subCollection = traverseDirectoryRecursively(entryPath);
      collection.push(...subCollection);
    }
  });

  return collection;
}
