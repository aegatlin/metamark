import { getSlug } from "./getSlug.js";
import { obsidianLinkBuilder as wikiLinkToObLink, ObsidianLinkType, } from "./obsidianLinkBuilder.js";
export function toLinkBuilder(pageAllowSet, getPageUri) {
    const toUri = function ({ page, header }) {
        var _a;
        let headerPart = header ? `#${getSlug(header)}` : "";
        let pagePart = null;
        if (page) {
            const { uri: pageURI, slug: pageSlug } = (_a = getPageUri === null || getPageUri === void 0 ? void 0 : getPageUri(page, getSlug)) !== null && _a !== void 0 ? _a : {
                uri: "/content",
                slug: getSlug(page),
            };
            pagePart = page ? `${pageURI}/${pageSlug}` : "";
        }
        if (pagePart && pageAllowSet.has(page)) {
            return header ? `${pagePart}${headerPart}` : pagePart;
        }
        return header ? headerPart : "";
    };
    const toLink = function (wikiLink) {
        const obLink = wikiLinkToObLink(wikiLink);
        const link = obLinkToLink(obLink, toUri);
        return link;
    };
    return toLink;
}
function obLinkToLink(oLink, toUri) {
    switch (oLink.type) {
        case ObsidianLinkType.Page: {
            const { alias, page } = oLink;
            const value = alias || page;
            const uri = toUri({ page });
            return uri ? { value, uri } : value;
        }
        case ObsidianLinkType.PageHeader: {
            const { alias, page, header } = oLink;
            const value = alias || `${page}#${header}`;
            const uri = toUri({ page, header });
            return uri ? { value, uri } : value;
        }
        case ObsidianLinkType.PageBlock: {
            const { alias, page } = oLink;
            const value = alias || page;
            const uri = toUri({ page });
            return uri ? { value, uri } : value;
        }
        case ObsidianLinkType.Header: {
            const { alias, header } = oLink;
            const value = alias || header;
            const uri = toUri({ header });
            return { value, uri };
        }
        case ObsidianLinkType.Block: {
            const { alias } = oLink;
            return alias || "";
        }
    }
}
