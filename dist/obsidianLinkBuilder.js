export var ObsidianLinkType;
(function (ObsidianLinkType) {
    ObsidianLinkType["Page"] = "page";
    ObsidianLinkType["PageHeader"] = "page-header";
    ObsidianLinkType["PageBlock"] = "page-block";
    ObsidianLinkType["Header"] = "header";
    ObsidianLinkType["Block"] = "block";
})(ObsidianLinkType = ObsidianLinkType || (ObsidianLinkType = {}));
const Regex = {
    Alias: /.+\|.+/,
    InternalHeader: /^#[^\^]+/,
    InternalBlock: /^#\^.+/,
    ExternalHeader: /.+#[^\^]+/,
    ExternalBlock: /.+#\^.+/,
};
function parseWikiLinkString(wikiLinkString) {
    const content = wikiLinkString.slice(2, -2);
    if (Regex.Alias.test(content)) {
        let [value, alias] = content.split("|");
        return { value: value.trim(), alias: alias.trim() };
    }
    else {
        return { value: content.trim() };
    }
}
export function obsidianLinkBuilder(wikiLink) {
    const { value, alias } = typeof wikiLink === "string" ? parseWikiLinkString(wikiLink) : wikiLink;
    let out = {};
    if (alias)
        out["alias"] = alias;
    if (Regex.InternalHeader.test(value)) {
        out["type"] = ObsidianLinkType.Header;
        out["header"] = value.slice(1);
    }
    else if (Regex.InternalBlock.test(value)) {
        out["type"] = ObsidianLinkType.Block;
        out["block"] = value.slice(2);
    }
    else if (Regex.ExternalHeader.test(value)) {
        const [page, header] = value.split("#");
        out["type"] = ObsidianLinkType.PageHeader;
        out["page"] = page;
        out["header"] = header;
    }
    else if (Regex.ExternalBlock.test(value)) {
        const [page, block] = value.split("#^");
        out["type"] = ObsidianLinkType.PageBlock;
        out["page"] = page;
        out["block"] = block;
    }
    else {
        out["type"] = ObsidianLinkType.Page;
        out["page"] = value;
    }
    return out;
}
