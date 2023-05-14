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

The "hard problem" of markdown processing an Obsidian vault is wiki links
(`[[Wiki Link]]`). Those links resolve to a file path within your vault
(`vaultDir/wiki-link`). When you turn them into html, they need to resolve to a
url path (`/content/wiki-link`). This library helps you manage that.

There are a couple fundamental questions when processing a vault. (1) Which
files are public and which are not? (2) How do you want to transform wiki links
when a linked file is public/private? This includes both what is display and,
if public, what the link is. The default behavior for (1) is a `frontmatter.public`
boolean. The default behavior for (2) is a suite a "reasonable defaults" that can
be configured.
