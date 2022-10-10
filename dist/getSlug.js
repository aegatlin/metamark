import slugify from '@sindresorhus/slugify';
export function getSlug(title) {
    return slugify(title, { decamelize: true });
}
