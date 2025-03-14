import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { Metamark } from "../../types";
import * as lib from "../../lib";

/**
 * This function is the default implementation of the "allow set" builder. It
 * takes the dirpath and constructs from is a `Set<string>` that represents the
 * "allow set", which is the set of files that are considered public, and viable
 * to be linked to in other notes.
 */
export const defaultFilePathAllowSetBuilder: Metamark.Obsidian.Vault.FilePathAllowSetBuilder =
  (dirPath) => {
    const filePaths = lib.utility.traverseVault(dirPath);
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
