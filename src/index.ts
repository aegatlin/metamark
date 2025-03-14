import * as lib from "./lib";
import { obsidianVaultProcess } from "./obsidian.vault.process";

export * from "./types";

const metamark = {
  obsidian: {
    vault: {
      process: obsidianVaultProcess,
    },
  },
  utility: {
    toSlug: lib.utility.toSlug,
    getFileName: lib.utility.getFileName,
    getFrontmatterAndMd: lib.utility.getFrontmatterAndMd,
    jsonStringify: lib.utility.jsonStringify,
    writeToFileSync: lib.utility.writeToFileSync,
  },
};

export default metamark;
