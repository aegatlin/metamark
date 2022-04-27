import { inspect } from "node:util";
export function i(x) {
    return inspect(x, { depth: null });
}
export function cli(x) {
    console.log(i(x));
}
