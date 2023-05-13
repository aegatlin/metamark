import { fileProcess } from "./file.process.js";
import { obsidianVaultProcess } from "./obsidian.vault.process.js";
import { obsidianVaultToJson } from "./obsidian.vault.toJson.js";

const metamark = {
  file: {
    process: fileProcess,
  },
  obsidian: {
    vault: {
      process: obsidianVaultProcess,
      // TODO: rename to `toJsonString`?
      toJson: obsidianVaultToJson
    },
  },
};

export default metamark;
