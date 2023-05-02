import fs from "node:fs";
import path from "node:path";
import process from "node:process";

/**
 * `nod` is that parts of node that this lib uses. It's like a little "standard
 * library" of utilities. The benefit is that I can pass it in as an optional
 * argument to functions, which makes stubbing it at a functional level viable
 * in tests.
 */
export const nod = {
  fs,
  path,
  process,
};

export type Nod = typeof nod;
