#!/usr/bin/env node

import { Command } from "commander";
import path from "path";
import metamark from "../dist/index.js";

const program = new Command();

program
  .name("obsidian-to-json")
  .description("Convert Obsidian vault to JSON")
  .version("1.0.0")
  .requiredOption("-i, --input <path>", "Input directory path (Obsidian vault)")
  .option("-o, --output <path>", "Output JSON file path", "vault-output.json")
  .option("-n, --note-prefix <prefix>", "Note path prefix", "/notes")
  .option("-a, --asset-prefix <prefix>", "Asset path prefix", "/assets")
  .option("-d, --debug <level>", "Debug level (0-2)", "1")
  .parse(process.argv);

const options = program.opts();

try {
  // Convert relative paths to absolute
  const inputPath = path.resolve(process.cwd(), options.input);
  const outputPath = path.resolve(process.cwd(), options.output);

  // Process the vault
  const vaultData = metamark.obsidian.vault.process(inputPath, {
    debug: parseInt(options.debug),
    notePathPrefix: options.notePrefix,
    assetPathPrefix: options.assetPrefix,
    imgLinkBuilderOpts: {
      prefix: options.assetPrefix,
      toSlug: metamark.utility.toSlug,
    },
  });

  // Convert to JSON and save
  const jsonString = metamark.utility.jsonStringify(vaultData);
  metamark.utility.writeToFileSync(outputPath, jsonString);

  console.log(`✨ Successfully processed ${vaultData.length} files`);
  console.log(`📝 Output saved to: ${outputPath}`);
} catch (error) {
  console.error("❌ Error processing vault:", error.message);
  process.exit(1);
}

// npm run convert -- -i test/testVault -o testOutput.json
