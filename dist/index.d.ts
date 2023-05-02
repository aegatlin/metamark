import * as unified from 'unified';
import * as path from 'path';
import * as node_fs from 'node:fs';

interface MetamarkTocItem {
    title: string;
    depth: number;
    id: string;
}

declare type GetPageUri = (page: string, toSlug: (s: string) => string) => {
    uri: string;
    slug: string;
};
declare type GetPageUriBuilder = (x: {
    frontmatter: {
        [key: string]: any;
    };
}) => GetPageUri;

interface GetMarksOptions {
    getPageUriBuilder?: GetPageUriBuilder;
}
interface Mark {
    page: string;
    slug: string;
    toc: MetamarkTocItem[];
    firstParagraphText: string;
    frontmatter: {
        [key: string]: any;
    };
    html: string;
    text: string;
}

/**
 * `Raw` is the raw string of a file. It can
 * contain stringified frontmatter, markdown, etc.
 */
declare type Raw = string;
/**
 * `Md` is a "true" md string, stripped of frontmatter,
 * etc.
 */
declare type Md = string;
/**
 * `Fm` is frontmatter
 */
declare type Fm = {
    [key: string]: any;
};

declare type ShouldAdd = (shouldAddInput: ShouldAddInput) => boolean;
interface ShouldAddInput {
    frontmatter: Fm;
}

declare const metamark: {
    dir: {
        process(dirPath: string, shouldAdd?: ShouldAdd, node?: {
            fs: typeof node_fs;
            path: path.PlatformPath;
            process: NodeJS.Process;
        }): {
            filePaths: string[];
            pageAllowSet: Set<string>;
        };
    };
    file: {
        getRaw: {
            fromFilePath(filePath: string, n?: {
                fs: typeof node_fs;
                path: path.PlatformPath;
                process: NodeJS.Process;
            }): string;
        };
        getMd: {
            fromRaw(raw: string): string;
            fromFilePath(filePath: string): string;
        };
        getFm: {
            fromRaw(raw: string): Fm;
            fromFilePath(filePath: string): Fm;
        };
        getFileName(filePath: string, n?: {
            fs: typeof node_fs;
            path: path.PlatformPath;
            process: NodeJS.Process;
        }): string;
    };
    unified: {
        getFirstParagraphText(md: string): string;
        getHtml(md: string, preset: unified.Preset): string;
        getText(md: string): string;
    };
    mark: {
        getMark(filePath: string, pageAllowSet: Set<string>, options?: GetMarksOptions): Mark;
        getMarks(filePathList: string[], pageAllowSet: Set<string>, options?: GetMarksOptions): Mark[];
    };
};

export { Fm, Mark, Md, Raw, ShouldAdd, metamark };
