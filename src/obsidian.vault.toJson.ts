import { fileProcess } from "./file.process.js";
import { getFileName } from "./file.utility.js";
import { Metamark } from "./types.js";

export function obsidianVaultToJson(
  vaultData: Metamark.Obsidian.Vault.Data
): string {
  const pages: Metamark.File.Data[] = [];

  for (const filePath of vaultData.filePaths) {
    const page = getFileName(filePath);
    if (vaultData.pageAllowSet.has(page)) {
      const page = fileProcess(filePath, {
        unified: vaultData.config.unifiedPreset,
      });
      pages.push(page);
    }
  }

  const jsonContents = JSON.stringify(pages, null, 2);
  return jsonContents;
}
