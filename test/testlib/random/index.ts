import crypto from "node:crypto";

export function string16chars(): string {
  return crypto.randomBytes(16).toString("hex");
}
