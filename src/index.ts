import { fileProcess } from "./file.process.js";
import { obsidianVaultProcess } from "./obsidian.vault.process.js";
import * as fileUtility from "./file.utility.js";
import * as utility from "./utility.js";

const metamark = {
  file: {
    process: fileProcess,
    utility: fileUtility,
  },
  obsidian: {
    vault: {
      process: obsidianVaultProcess,
    },
  },
  utility,
};

export default metamark;
