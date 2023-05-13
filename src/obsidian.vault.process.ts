import path from "node:path";
import { Metamark } from "./types";
import fs from "node:fs";
import { getFileName, getFrontmatterAndMd } from "./file.process.js";
import { unifiedDefaultPresetConfig } from "./unified.defaultPresetConfig";

export function obsidianVaultProcess(
  dirPath: string,
  config: Metamark.Obsidian.VaultConfig = defaultConfig()
): Metamark.Obsidian.Vault {
  const dirEntries = fs.readdirSync(dirPath, { withFileTypes: true });

  const pageAllowSet = new Set<string>();
  const filePaths: string[] = [];

  dirEntries.forEach((dirEntry) => {
    if (dirEntry.isFile()) {
      const filePath = path.join(dirPath, dirEntry.name);
      const page = getFileName(filePath);
      const { frontmatter } = getFrontmatterAndMd(filePath);

      if (config.shouldIncludeFile({ frontmatter })) {
        pageAllowSet.add(page);
        filePaths.push(filePath);
      }
    }
  });

  return { filePaths, pageAllowSet, config };
}

function defaultConfig(): Metamark.Obsidian.VaultConfig {
  const config: Metamark.Obsidian.VaultConfig = {
    shouldIncludeFile: ({ frontmatter }) => !!frontmatter?.public,
    unifiedConfig: unifiedDefaultPresetConfig(),
  };

  return config;
}
