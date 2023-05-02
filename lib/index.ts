import { file, Md, Fm, Raw } from "./file/index.js";
import { dir, ShouldAdd } from "./dir/index.js";
import { unified } from "./unified/index.js";
import { mark, Mark } from "./mark/index.js";

export const metamark = {
  dir,
  file,
  unified,
  mark,
};

export { Md, Fm, Raw, Mark, ShouldAdd };
