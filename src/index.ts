import { obsidianVaultProcess } from "./obsidian.vault.process";
import * as utility from "./utility";
export * from "./types";

const metamark = {
  obsidian: {
    vault: {
      process: obsidianVaultProcess,
    },
  },
  utility,
};

export default metamark;
