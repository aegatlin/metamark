import { fileProcess, getFileName } from "./file.process.js";
import { Metamark } from "./types.js";

export function obsidianVaultToJson(vault: Metamark.Obsidian.Vault): string {
  const pages: Metamark.File[] = [];

  for (const filePath of vault.filePaths) {
    const page = getFileName(filePath);
    if (vault.pageAllowSet.has(page)) {
      const page = fileProcess(filePath, {
        unifiedConfig: vault.config.unifiedConfig,
      });
      pages.push(page);
    }
  }

  const jsonContents = JSON.stringify(pages, null, 2);
  return jsonContents;
}
