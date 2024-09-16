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
    ...lib.utility,
  },
};

export default metamark;
