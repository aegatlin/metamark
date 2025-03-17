import matter from "gray-matter";
import fs from "node:fs";
import path from "node:path";
import * as lib from ".";
import { Metamark } from "../types";

/**
 * This function is the default implementation of the "allow set" builder. It
 * takes the dirpath and constructs from is a `Set<string>` that represents the
 * "allow set", which is the set of files that are considered public, and viable
 * to be linked to in other notes.
 */
export const defaultFilePathAllowSetBuilder: Metamark.Obsidian.Vault.FilePathAllowSetBuilder =
  (dirPath) => {
    const filePaths = lib.obsidian.traverseVault(dirPath);
    const filePathAllowSet = new Set<string>();

    filePaths.forEach((filePath) => {
      const raw = fs.readFileSync(filePath, "utf8");
      const { data: frontmatter } = matter(raw);
      if (!!frontmatter.public) {
        filePathAllowSet.add(filePath);
      }
    });

    return filePathAllowSet;
  };

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
