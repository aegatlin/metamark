import os from "node:os";
import fs from "node:fs";
import * as testlib from "../../testlib";

/**
 * Creates an empty vault (i.e., empty directory) using `os.tmpdir()`
 * plus a random string.
 *
 * For example on MacOS the temporary directory would be something
 * like `/var/folders/bs/p5ctntmj24995dp45bpxxr2w0000gn/T`. This
 * function would return something like `.../T/abc123/`
 */
export function tmpVault(): string {
  const osTmpDir = os.tmpdir();
  const randomDirName = testlib.random.string16chars();
  const dirPath = `${osTmpDir}/${randomDirName}`;
  fs.mkdirSync(dirPath);
  return dirPath;
}

export function newFile(data: {
  parentDirPath: string;
  fileName: string;
  content: string;
}) {
  const filePath = `${data.parentDirPath}/${data.fileName}`;
  fs.writeFileSync(filePath, data.content);
  return { filePath };
}

export function newDir(data: { parentDirPath: string; dirName: string }) {
  const dirPath = `${data.parentDirPath}/${data.dirName}`;
  fs.mkdirSync(dirPath);
  return { dirPath };
}
