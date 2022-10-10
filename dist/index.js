import { readFileSync } from 'fs';
import matter from 'gray-matter';
import { toString } from 'mdast-util-to-string';
import path from 'path';
import remarkGfm from 'remark-gfm';
import { remarkObsidianLink } from 'remark-obsidian-link';
import remarkParse from 'remark-parse';
import { unified } from 'unified';
import { getSlug } from './getSlug.js';
import { getTocData } from './getTocData.js';
import { preset, presetBuilder } from './presets.js';
import { toLinkBuilder } from './toLinkBuilder.js';
function getFrontmatter(rawMd) {
    const { data: frontmatter } = matter(rawMd);
    return frontmatter;
}
function getFirstParagraphText(md) {
    const mdast = unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkObsidianLink, { toLink: () => '' }) // turn off links
        .parse(md);
    const firstParagraph = mdast.children.find((child) => child.type === 'paragraph');
    return toString(firstParagraph);
}
function toHtml(md, preset) {
    return unified().use(preset).processSync(md).toString();
}
function getTitle(filePath) {
    const { name: title } = path.parse(filePath);
    return title;
}
function getRawMd(filePath) {
    return readFileSync(filePath, 'utf8');
}
function getMdNoFrontmatter(rawMd) {
    const { content: md } = matter(rawMd);
    return md;
}
function all(filePath, pageAllowSet) {
    const rawMd = getRawMd(filePath);
    const title = getTitle(filePath);
    const md = getMdNoFrontmatter(rawMd);
    const preset = presetBuilder({ toLink: toLinkBuilder(pageAllowSet) });
    const html = toHtml(md, preset);
    return {
        title,
        slug: getSlug(title),
        toc: getTocData(html),
        firstParagraphText: getFirstParagraphText(md),
        frontmatter: getFrontmatter(rawMd),
        html,
    };
}
export const Metamark = {
    all,
    getFirstParagraphText,
    getFrontmatter,
    getMdNoFrontmatter,
    getRawMd,
    getSlug,
    getTitle,
    getTocData,
    preset,
    presetBuilder,
    toHtml,
};
