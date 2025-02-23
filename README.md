# Obsidian parser

A markdown utility.

This is a form from metamark that aims to add features like:

- includes CLI utilities
- image + ress parsing
- more customization

## CLI usage

### Basic conversion with your own arguments

npm run convert -- -i test/testVault -o test/cliTestOutput.json

### Run the example configuration

npm run convert:example

### Run with extra debug information

npm run convert:dev -- -i /path/to/vault

# Obsidian

A primary use case for metamark is processing Obsidian vaults.

If you have an Obsidian vault, you want to share some or all of the content of
that vault, and the popular methods of doing so (e.g., Obsidian Publish) are
undesirable, then this might be a good reason to try metamark.

```ts
import metamark from "metamark";

const vaultData = metamark.obsidian.vault.process("../path/to/vault/");
const jsonString = metamark.utility.jsonStringify(vaultData);
metamark.utility.writeToFileSync("./content.json", jsonString);
```

### The tricky bit: wiki links

The "hard problem" of processing an Obsidian vault is wiki links (`[[Wiki Link]]`).
Those links resolve to a file path within your vault
(`vaultDir/wiki-link`). When you turn them into html, they need to resolve to a
url path (`/content/wiki-link`). This library helps you manage that.

There are a couple fundamental questions when processing a vault. (1) Which
files are public and which are not? (2) How do you want to transform wiki links
when a linked file is public/private? This includes both what is displayed and,
if public, what the link URL is.

This is a complicated issue, and controlling the behavior results in complicated
options when you call `m.obsidian.vault.process(dirPath, opts)`. Please see
[types.ts](./src/types.ts) jsdocs for `Metamark.Obsidian.Vault.ProcessOpts` to
learn more.

## Publishing

`npm version patch` will bump the version in `package.json` and create a new git
commit and git tag for that version. `git push` will push the commits to
remote, but you need to also run `git push --tags` to push the new tags to
remote. You can then create a release via the github UI for that tag.
`npm publish` will then push those changes to npm.
