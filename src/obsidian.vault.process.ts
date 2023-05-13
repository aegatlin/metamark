import fs from "node:fs";
import path from "node:path";
import { getFileName, getFrontmatterAndMd } from "./file.utility";
import { Metamark } from "./types";
import { isPreset } from "./unified.utility";
import {
  buildDefaultPresetConfig,
  defaultPreset,
} from "./unified.defaultPreset";
import { fileProcess } from "./file.process";

export function obsidianVaultProcess(
  dirPath: string,
  opts?: Partial<Metamark.Obsidian.Vault.ProcessOptions>
): Metamark.Obsidian.Vault.Data {
  const config = buildConfig(opts);
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

  const pages: Metamark.File.Data[] = [];

  for (const filePath of filePaths) {
    const page = getFileName(filePath);
    if (pageAllowSet.has(page)) {
      const page = fileProcess(filePath, {
        unified: config.unifiedPreset,
      });
      pages.push(page);
    }
  }

  return { filePaths, pageAllowSet, pages };
}

function buildConfig(
  opts?: Metamark.Obsidian.Vault.ProcessOptions
): Metamark.Obsidian.Vault.Config {
  const shouldIncludeFile =
    opts?.shouldIncludeFile ?? (({ frontmatter }) => !!frontmatter.public);

  if (opts?.unified) {
    if (isPreset(opts.unified)) {
      return { shouldIncludeFile, unifiedPreset: opts.unified };
    } else {
      const config = buildDefaultPresetConfig(opts.unified);
      const preset = defaultPreset(config);
      return { shouldIncludeFile, unifiedPreset: preset };
    }
  } else {
    const config = buildDefaultPresetConfig();
    const preset = defaultPreset(config);
    return { shouldIncludeFile, unifiedPreset: preset };
  }
}
