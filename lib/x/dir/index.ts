import { nd, Nd } from "../nd.js";
import { file, Fm } from "../file/index.js";

export const dir = {
  process(
    dirPath: string,
    shouldAdd: ShouldAdd = defaultShouldAdd,
    node: Nd = nd
  ): { filePaths: string[]; pageAllowSet: Set<string> } {
    const dirEntries = node.fs.readdirSync(dirPath, { withFileTypes: true });

    const pageAllowSet = new Set<string>();
    const filePaths: string[] = [];

    dirEntries.forEach((dirEntry) => {
      if (dirEntry.isFile()) {
        const filePath = node.path.join(dirPath, dirEntry.name);
        const page = file.getFileName(filePath);
        const frontmatter: Fm = file.getFm.fromFilePath(filePath);

        if (shouldAdd({ frontmatter })) {
          pageAllowSet.add(page);
          filePaths.push(filePath);
        }
      }
    });

    return { filePaths, pageAllowSet };
  },
};

export type ShouldAdd = (shouldAddInput: ShouldAddInput) => boolean;

interface ShouldAddInput {
  frontmatter: Fm;
}

const defaultShouldAdd: ShouldAdd = ({ frontmatter }) => !!frontmatter?.public;
