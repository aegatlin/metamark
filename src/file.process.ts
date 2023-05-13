import { getFileName, getFrontmatterAndMd } from "./file.utility.js";
import { toSlug } from "./utility.js";
import { Metamark } from "./types.js";
import {
  getFirstParagraphText,
  getHtml,
  getText,
  getTocData,
} from "./unified.js";
import {
  buildDefaultPresetConfig,
  defaultPreset,
} from "./unified.defaultPreset.js";
import { isPreset } from "./unified.utility.js";

export function fileProcess(
  filePath: string,
  opts?: Metamark.File.ProcessOptions
): Metamark.File.Data {
  const config = buildConfig(opts);
  const fileName = getFileName(filePath);
  const { md, frontmatter } = getFrontmatterAndMd(filePath);
  const html = getHtml(md, config.unifiedPreset);

  const file: Metamark.File.Data = {
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

function buildConfig(
  opts?: Metamark.File.ProcessOptions
): Metamark.File.Config {
  if (opts?.unified) {
    if (isPreset(opts.unified)) {
      // unified = `Preset`
      return {
        unifiedPreset: opts.unified,
      };
    } else {
      // unified = `Metamark.Unified.DefaultConfig.Options
      const config = buildDefaultPresetConfig(opts.unified);
      const preset = defaultPreset(config);
      return { unifiedPreset: preset };
    }
  } else {
    // unified = `undefined`
    const config = buildDefaultPresetConfig();
    const preset = defaultPreset(config);
    return { unifiedPreset: preset };
  }
}
