var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { toc } from 'mdast-util-toc';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import { unified } from 'unified';
function getMdast(md) {
    return unified().use(remarkParse).use(remarkGfm).parse(md);
}
export function getToc(md) {
    try {
        var mdast = getMdast(md);
        var mdastToc = toc(mdast);
        var h1ListItem = mdastToc.map.children[0];
        var h2List = h1ListItem.children[1];
        return listToToc(h2List);
    }
    catch (_a) {
        return [];
    }
}
function linkTextToTocItem(link) {
    var text = link.children[0];
    return {
        title: text.value,
        url: link.url
    };
}
function paragraphLinkToTocItem(p) {
    return linkTextToTocItem(p.children[0]);
}
function paragraphLinkListItemToTocItem(listItem) {
    return paragraphLinkToTocItem(listItem.children[0]);
}
function isParagraph(x) {
    return x.type == 'paragraph';
}
function isLink(x) {
    return x.type == 'link';
}
function isParagraphLink(x) {
    return isParagraph(x) && x.children.length == 1 && isLink(x.children[0]);
}
function isParagraphLinkListItem(listItem) {
    return listItem.children.length == 1 && isParagraphLink(listItem.children[0]);
}
function isList(x) {
    return x.type == 'list';
}
function hasSubToc(listItem) {
    return (listItem.children.length == 2 &&
        isParagraphLink(listItem.children[0]) &&
        isList(listItem.children[1]));
}
function listItemToTocItem(listItem) {
    if (isParagraphLinkListItem(listItem))
        return paragraphLinkListItemToTocItem(listItem);
    if (hasSubToc(listItem)) {
        var _a = listItem.children, paragraphLink = _a[0], subTocList = _a[1];
        var tocItem = paragraphLinkToTocItem(paragraphLink);
        var subToc = listToToc(subTocList);
        return __assign(__assign({}, tocItem), { children: subToc });
    }
}
function listToToc(list) {
    return list.children.map(listItemToTocItem);
}
