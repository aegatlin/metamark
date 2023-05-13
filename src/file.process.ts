import matter from "gray-matter";
import fs from "node:fs";
import path from "node:path";
import { toSlug } from "./toSlug.js";
import { Metamark } from "./types.js";
import {
  getFirstParagraphText,
  getHtml,
  getText,
  getTocData,
} from "./unified.js";
import { unifiedPreset } from "./unified.preset.js";
import { unifiedDefaultPresetConfig } from "./unified.defaultPresetConfig.js";

export function fileProcess(
  filePath: string,
  config: Metamark.FileConfig = defaultConfig()
): Metamark.File {
  const fileName = getFileName(filePath);
  const { md, frontmatter } = getFrontmatterAndMd(filePath);
  const html = getHtml(md, unifiedPreset(config.unifiedConfig));

  const file: Metamark.File = {
    fileName,
    slug: toSlug(fileName),
    frontmatter,
    firstParagraphText: getFirstParagraphText(md),
    text: getText(md),
    html,
    toc: getTocData(html),
  };

  return file;
}

function defaultConfig(): Metamark.FileConfig {
  const presetConfig = unifiedDefaultPresetConfig();

  const config: Metamark.FileConfig = {
    unifiedConfig: presetConfig,
  };

  return config;
}

export function getFileName(filePath: string): string {
  const { name } = path.parse(filePath);
  return name;
}

export function getFrontmatterAndMd(filePath: string) {
  const raw = fs.readFileSync(filePath, "utf8");
  const { content, data } = matter(raw);
  return {
    md: content,
    frontmatter: data,
  };
}
