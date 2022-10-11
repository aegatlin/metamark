import slugify from '@sindresorhus/slugify';
export function getSlug(s) {
    return slugify(s, { decamelize: true });
}
