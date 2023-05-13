import { expect, test } from "vitest";
import m from "../../src/index.js";

function setup() {
  return { vaultPath: "./tests/testVaults/simple/" };
}

test("simple vault", () => {
  const { vaultPath } = setup();

  const vaultData = m.obsidian.vault.process(vaultPath);

  expect(vaultData.filePaths).toEqual(
    expect.arrayContaining([
      "tests/testVaults/simple/file1.md",
      "tests/testVaults/simple/file3.md",
    ])
  );

  expect(Array.from(vaultData.pageAllowSet)).toEqual(["file1", "file3"]);

  expect(vaultData.pages).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ text: "one" }),
      expect.objectContaining({ text: "three" }),
    ])
  );
});

// test("simple vault custom config", () => {
//   const { vaultPath } = setup();
//   const vaultData = m.obsidian.vault.process(vaultPath, {
//     unified: {
//       remarkObsidianLink: {
//         toLink: (wikiLink) => {
//           return {
//             value: wikiLink.value,
//             uri:
//           }
//         }
//       }
//     }
//   });
// });
