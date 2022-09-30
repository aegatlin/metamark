import slugify from '@sindresorhus/slugify';
import { readdirSync, readFileSync } from 'fs';
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
export function metamarkDir(dirPath) {
    const dirEntries = readdirSync(dirPath, { withFileTypes: true });
    const whitelist = [];
    dirEntries.forEach((dirEntry) => {
        if (dirEntry.isFile()) {
            const rawMd = readFileSync(path.join(dirPath, dirEntry.name), 'utf8');
            const { data: frontmatter } = matter(rawMd);
            if (frontmatter === null || frontmatter === void 0 ? void 0 : frontmatter.public) {
                whitelist.push(slugify(dirEntry.name));
            }
        }
    });
    const toUri = (name) => {
        const slug = `${slugify(name)}-md`;
        if (whitelist.includes(slug)) {
            return `./${slug}`;
        }
        else
            return false;
    };
    const metamarks = [];
    dirEntries.forEach((dirEntry) => {
        if (dirEntry.isFile()) {
            const fileName = dirEntry.name;
            const fileNameSlug = slugify(fileName);
            if (whitelist.includes(fileNameSlug)) {
                metamarks.push(metamark(dirEntry.name, { toUri }));
            }
        }
    });
    return metamarks;
}
export function metamark(filePath, opts) {
    const toUri = opts.toUri || (() => false);
    const { base, name, ext } = path.parse(filePath);
    const rawMd = readFileSync(filePath, 'utf8');
    const { data: frontmatter, content: md } = matter(rawMd);
    const mdast = getMdastProcessor({ toUri }).parse(md);
    const hast = getHastProcessor({ toUri }).parse(md);
    const html = getHastProcessor({ toUri }).processSync(md).toString();
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
function getMdastProcessor({ toUri }) {
    return unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkWikiLinksToLinks, { toUri });
}
function getHastProcessor({ toUri }) {
    return getMdastProcessor({ toUri })
        .use(remarkRehype)
        .use(rehypeSlug)
        .use(rehypeAutolinkHeadings, { behavior: 'wrap' })
        .use(rehypeHighlight, { languages: { elixir } })
        .use(rehypeStringify);
}
