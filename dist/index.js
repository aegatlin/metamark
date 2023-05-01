import { readFileSync } from "fs";
import matter from "gray-matter";
import { toString } from "mdast-util-to-string";
import path from "path";
import remarkGfm from "remark-gfm";
import { remarkObsidianLink } from "remark-obsidian-link";
import remarkParse from "remark-parse";
import { unified } from "unified";
import { getSlug } from "./getSlug.js";
import { getTocData } from "./getTocData.js";
import { preset, presetBuilder } from "./presets.js";
import { toLinkBuilder } from "./toLinkBuilder.js";
function getFrontmatter(rawMd) {
    const { data: frontmatter } = matter(rawMd);
    return frontmatter;
}
function getFirstParagraphText(md) {
    const mdast = unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkObsidianLink)
        .parse(md);
    const firstParagraph = mdast.children.find((child) => child.type === "paragraph");
    return toString(firstParagraph);
}
function toText(md) {
    const mdast = unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkObsidianLink)
        .parse(md);
    return toString(mdast);
}
function toHtml(md, preset) {
    return unified().use(preset).processSync(md).toString();
}
function getPage(filePath) {
    const { name: page } = path.parse(filePath);
    return page;
}
function getRawMd(filePath) {
    return readFileSync(filePath, "utf8");
}
function getMdNoFrontmatter(rawMd) {
    const { content: md } = matter(rawMd);
    return md;
}
function getMark(filePath, pageAllowSet, options) {
    var _a, _b;
    const rawMd = getRawMd(filePath);
    const page = getPage(filePath);
    const md = getMdNoFrontmatter(rawMd);
    const frontmatter = getFrontmatter(rawMd);
    const getPageUri = (_b = (_a = options === null || options === void 0 ? void 0 : options.getPageUriBuilder) === null || _a === void 0 ? void 0 : _a.call(options, { frontmatter })) !== null && _b !== void 0 ? _b : undefined;
    const preset = presetBuilder({
        toLink: toLinkBuilder(pageAllowSet, getPageUri),
    });
    const html = toHtml(md, preset);
    return {
        page,
        slug: getSlug(page),
        toc: getTocData(html),
        firstParagraphText: getFirstParagraphText(md),
        frontmatter,
        html,
        text: toText(md),
    };
}
function getMarks(filePathList, pageAllowSet, options) {
    const marks = [];
    for (const filePath of filePathList) {
        const page = getPage(filePath);
        if (pageAllowSet.has(page)) {
            marks.push(getMark(filePath, pageAllowSet, options));
        }
    }
    return marks;
}
export const Metamark = {
    getFirstParagraphText,
    getFrontmatter,
    getMark,
    getMarks,
    getMdNoFrontmatter,
    getRawMd,
    getSlug,
    getPage,
    getTocData,
    preset,
    presetBuilder,
    toHtml,
    toText,
};
