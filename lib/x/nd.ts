import fs from "node:fs";
import path from "node:path";
import process from "node:process";

export const nd = {
  fs,
  path,
  process,
};

export type Nd = typeof nd;
