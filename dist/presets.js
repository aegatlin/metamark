import elixir from 'highlight.js/lib/languages/elixir';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm';
import { remarkObsidianLink } from 'remark-obsidian-link';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
export const presetBuilder = ({ toLink }) => {
    return {
        plugins: [
            remarkParse,
            remarkGfm,
            [remarkObsidianLink, { toLink }],
            remarkRehype,
            rehypeSlug,
            [rehypeAutolinkHeadings, { behavior: 'wrap' }],
            [rehypeHighlight, { languages: { elixir } }],
            rehypeStringify,
        ],
    };
};
export const preset = {
    plugins: [
        remarkParse,
        remarkGfm,
        remarkObsidianLink,
        remarkRehype,
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: 'wrap' }],
        [rehypeHighlight, { languages: { elixir } }],
        rehypeStringify,
    ],
};
