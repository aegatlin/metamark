import { WikiLink } from "remark-obsidian-link";

/**
 * This is the test version of what
 * [remark-wiki-link](https://www.npmjs.com/package/remark-wiki-link) does,
 * which is used by my lib remark-obsidian-link. `remark-wiki-link` transforms
 * markdown text into a `WikiLink`. It's much more sophisticated than this but
 * this will do for testing purposes.
 *
 * Probably, I should just construct raw `WikiLink`'s in tests, though.
 */
export function parseWikiLinkString(wikiLinkString: string): WikiLink {
  const content = wikiLinkString.slice(2, -2);
  const alias = /.+\|.+/;

  if (alias.test(content)) {
    let [value, alias] = content.split("|");
    return { value: value.trim(), alias: alias.trim() };
  } else {
    return { value: content.trim() };
  }
}
