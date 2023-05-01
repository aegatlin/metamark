import { fromHtml } from "hast-util-from-html";
import { heading } from "hast-util-heading";
import { toText } from "hast-util-to-text";
import { visit } from "unist-util-visit";
export function getTocData(html) {
    const hast = fromHtml(html);
    const flatToc = [];
    visit(hast, heading, (node) => {
        var _a;
        const tagName = node === null || node === void 0 ? void 0 : node.tagName;
        flatToc.push({
            title: toText(node),
            depth: parseInt(tagName === null || tagName === void 0 ? void 0 : tagName.at(1)) || -1,
            id: (_a = node === null || node === void 0 ? void 0 : node.properties) === null || _a === void 0 ? void 0 : _a.id,
        });
    });
    return flatToc;
}
