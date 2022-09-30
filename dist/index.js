import slugify from '@sindresorhus/slugify';
import { readFileSync } from 'fs';
import matter from 'gray-matter';
import { fromHtml } from 'hast-util-from-html';
import { heading } from 'hast-util-heading';
import { toText } from 'hast-util-to-text';
import elixir from 'highlight.js/lib/languages/elixir';
import { toString } from 'mdast-util-to-string';
import path from 'path';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { remarkWikiLinksToLinks } from 'remark-wiki-links-to-links';
import { unified } from 'unified';
import { visit } from 'unist-util-visit';
export function metamark(filePath) {
    const { base, name, ext } = path.parse(filePath);
    const rawMd = readFileSync(filePath, 'utf8');
    const { data: frontmatter, content: md } = matter(rawMd);
    const mdast = getMdastProcessor().parse(md);
    const hast = getHastProcessor().parse(md);
    const html = getHastProcessor().processSync(md).toString();
    return {
        file: { name, ext, base },
        title: name,
        slug: slugify(name),
        frontmatter,
        firstParagraphText: getFirstParagraphText(mdast),
        toc: getTocFromHtml(html),
        content: { rawMd, md, mdast, hast, html },
    };
}
function getFirstParagraphText(mdast) {
    const firstParagraph = mdast.children.find((child) => child.type === 'paragraph');
    return toString(firstParagraph);
}
function getTocFromHtml(html) {
    const hast = fromHtml(html);
    const flatToc = [];
    visit(hast, heading, (node) => {
        var _a;
        const tagName = node === null || node === void 0 ? void 0 : node.tagName;
        flatToc.push({
            title: toText(node),
            tagName,
            depth: parseInt(tagName === null || tagName === void 0 ? void 0 : tagName.at(1)) || -1,
            id: (_a = node === null || node === void 0 ? void 0 : node.properties) === null || _a === void 0 ? void 0 : _a.id,
        });
    });
    return flatToc;
}
function getMdastProcessor() {
    return unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkWikiLinksToLinks, { toUri: (name) => `./${slugify(name)}` });
}
function getHastProcessor() {
    return getMdastProcessor()
        .use(remarkRehype)
        .use(rehypeSlug)
        .use(rehypeAutolinkHeadings, { behavior: 'wrap' })
        .use(rehypeHighlight, { languages: { elixir } })
        .use(rehypeStringify);
}
