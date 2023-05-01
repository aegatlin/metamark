# x

## Usage

```ts
import { metamark as m, Md, Mark } from "metamark";

// const md: Md = m.file.getMd.fromFilePath("./path/to/File.md");
const md: Md = m.file.getMd.fromContent("# Hello");

m.file.getFileName(md);
m.unified.getFirstParagraphText(md);

const mark: Mark = m.mark.getMark(md);
```

## Obsidian use case

```js
#! /usr/bin/env node

import { readdirSync, readFileSync, writeFileSync } from "fs";
import { metamark as m } from "metamark";
import path from "path";

const { filePaths, pageAllowSet } = m.dir.process("../vault");
const marks = m.mark.getMarks(filePaths, pageAllowSet);

const jsonContents = JSON.stringify(marks, null, 2);
writeFileSync("./contents.json", jsonContents);
```
