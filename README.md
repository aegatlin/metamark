# Obsidian Parser

A powerful markdown utility built on top of Metamark that enhances your Obsidian vault processing capabilities.

## Features

- [x] Single-line conversion to JSON for efficient data transformation
- [x] Comprehensive CLI utilities and npm scripts for easy automation
- [x] Customizable link prefix to match your frontend routing requirements
- [ ] Advanced image and resource parsing for Obsidian's `![[filename]]` syntax
- [ ] Configurable assets URL prefix supporting CDN hosting and image-resizing
- [ ] Optional image pre-processing scripts for streamlined hosting
- [ ] Link graph extraction (including backlinks for files and resources)
- [ ] Extended customization options for flexible workflow integration

## CLI Usage

### Basic Conversion with Custom Arguments

Convert your Obsidian vault to JSON with specific input and output paths:

```bash
npm run convert -- -i test/testVault -o test/cliTestOutput.json
```

### Run the Example Configuration

Execute the conversion using predefined example settings:

```bash
npm run convert:example
```

### Debug Mode

Run the conversion with additional debugging information:

```bash
npm run convert:dev -- -i /path/to/vault
```

## Metamark Documentation

### Overview

Metamark serves as the foundation for processing Obsidian vaults, particularly useful when you want to share vault content through custom platforms rather than using solutions like Obsidian Publish.

### Basic Usage

Here's a simple example of processing an Obsidian vault:

```typescript
import metamark from "metamark";

// Process the vault and generate structured data
const vaultData = metamark.obsidian.vault.process("../path/to/vault/");

// Convert the data to a JSON string
const jsonString = metamark.utility.jsonStringify(vaultData);

// Write the result to a file
metamark.utility.writeToFileSync("./content.json", jsonString);
```

### Understanding Wiki Links

The primary challenge in processing an Obsidian vault lies in handling wiki links (`[[Wiki Link]]`). These links need to be transformed from vault-relative paths (`vaultDir/wiki-link`) to URL-friendly paths (`/content/wiki-link`).

When processing a vault, two fundamental considerations arise:

1. Content Access Control

   - Which files should be publicly accessible?
   - What content should remain private?

2. Wiki Link Transformation
   - How should links be displayed for public vs. private content?
   - What URL structure should be used for public content?
   - How should private content references be handled?

For detailed configuration options, please refer to the `Metamark.Obsidian.Vault.ProcessOpts` documentation in [types.ts](./src/types.ts).

## Publishing Guide

To publish new versions of the package:

1. Version Bump:

   ```bash
   npm version patch
   ```

   This command:

   - Updates the version in `package.json`
   - Creates a new git commit
   - Adds a version tag

2. Push Changes:

   ```bash
   git push
   git push --tags
   ```

3. Release Process:
   - Create a new release through the GitHub UI using the new tag
   - Run `npm publish` to publish to the npm registry

This process ensures proper version control and distribution of your package updates.
