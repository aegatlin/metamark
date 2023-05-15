# Metamark

A markdown utility.

## Obsidian

A primary use case for metamark is processing Obsidian vaults.

You have an Obsidian vault. You want to share some or all of the content. The
popular methods of doing so (Obsidian Publish, manual file sharing, etc.) are
undesirable for some reason (like you want to include the content within a
pre-existing website). This is a good usage story for trying metamark.

```ts
const vaultData = metamark.obsidian.vault.process("../path/to/vault/");
const jsonString = metamark.utility.toJsonString(vaultData);
metamark.utility.writeToFileSync("./content.json", jsonString);
```

### The tricky bit: wiki links

The "hard problem" of processing an Obsidian vault is wiki links
(`[[Wiki Link]]`). Those links resolve to a file path within your vault
(`vaultDir/wiki-link`). When you turn them into html, they need to resolve to a
url path (`/content/wiki-link`). This library helps you manage that.

There are a couple fundamental questions when processing a vault. (1) Which
files are public and which are not? (2) How do you want to transform wiki links
when a linked file is public/private? This includes both what is displayed and,
if public, what the link URL is.

This is a complicated issue, and controlling the behavior results in complicated
options when you call `m.obsidian.vault.process(dirPath, opts)`. Please see
[types.ts](./src/types.ts) jsdocs for `Metamark.Obsidian.Vault.ProcessOpts` to learn more.
