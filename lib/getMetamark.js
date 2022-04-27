import { fstatSync, openSync, readFileSync } from 'node:fs';
import rehypeStringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import { getToc } from './getToc.js';
function getHtml(md) {
    return unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkRehype)
        .use(rehypeStringify)
        .processSync(md)
        .toString();
}
function getSlug(filePath) {
    var lastOfPath = filePath.split('/').pop();
    var lastNoExt = lastOfPath.split('.').shift();
    return lastNoExt;
}
export function getMetamark(filePath) {
    var fileDescriptor = openSync(filePath);
    var fileStats = fstatSync(fileDescriptor);
    var metadata = {
        createdAt: fileStats.birthtime,
        updatedAt: fileStats.mtime,
        slug: getSlug(filePath)
    };
    var md = readFileSync(filePath, 'utf-8');
    var metamark = {
        metadata: metadata,
        md: md,
        html: getHtml(md),
        toc: getToc(md)
    };
    return metamark;
}
