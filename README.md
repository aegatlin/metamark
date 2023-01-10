# Metamark

A markdown manipulation utility.

## Usage

An example use case for metamark is transforming notes from an Obsidian vault into a JSON blob that is then saved to a personal website repo and used as the data source for content. The key function for this use case is `Metamark.getMarks`, which takes a list of `filePaths` (the notes in the Obsidian vault), and a `pageAllowSet` (the notes you make public).

In the example build script below, I use `Metamark.getFrontmatter` to check for `public: true` on the note. If the note is public, then it both is a file to save (in `filePaths`) and a file that can be referenced by other files (in `pageAllowSet`). Next, I pass the entities to `Metamark.getMarks(filePaths, pageAllowSet)`. This function returns JSON data, an array of `Mark` objects. Lastly, I write it to a local file.

Note that this build process takes place within the consuming repo, e.g., the personal website repo.

```js
#! /usr/bin/env node

import { readdirSync, readFileSync, writeFileSync } from 'fs'
import { Metamark } from 'metamark'
import path from 'path'

const dirPath = '../vault'
const dirEntries = readdirSync(dirPath, { withFileTypes: true })

const pageAllowSet = new Set()
const filePaths = []

dirEntries.forEach((dirEntry) => {
  if (dirEntry.isFile()) {
    const filePath = path.join(dirPath, dirEntry.name)
    const { name: page } = path.parse(filePath)
    const rawMd = readFileSync(filePath, 'utf8')
    const frontmatter = Metamark.getFrontmatter(rawMd)
    if (frontmatter?.public) {
      pageAllowSet.add(page)
      filePaths.push(filePath)
    }
  }
})

const marks = Metamark.getMarks(filePaths, pageAllowSet)
const jsonContents = JSON.stringify(marks, null, 2)
writeFileSync('./contents.json', jsonContents)
```

## API

See `lib/index.ts` for all APIs attacked to the `Metamark` top-level object. Some of the most important are as follows.

### Metamark.getFrontmatter

type: `(rawMd: string) => { [key: string]: any }`

`rawMd` is the unprocessed `.md` text file. It returns a JSON object of the frontmatter / metadata of the file.

### Metamark.getMarks

type: `(filePathList: string[], pageAllowSet: Set<string>) => Mark[]`

Creates an array of `Mark` objects (defined in `lib/index.ts`). Each `Mark` contains data related to individual files like `slug`, `toc` (table of contents), `html`, etc. An individual `Mark` can be fetched via `Metamark.getMark`.

### Metamark.getTocData

type: `(html: string) => MetamarkTocItem[]`

This function returns a JSON array based on the headers within the `html` file. A `MetamarkTocItem` contains a `title`, `depth`, and `id` (which is a fragment link which can be used to navigate to the header).

This API is useful if you want to use the toc data to create your own ToC experience. You can build your own user experience around it.
