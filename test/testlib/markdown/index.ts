/** Returns "markdown content" that is just the frontmatter of `public: true` */
export function frontmatterPublicTrue(): string {
  return `---
public: true
---
`;
}

/** Returns "markdown content" that is just the frontmatter of `public: false` */
export function frontmatterPublicFalse(): string {
  return `---
public: false
---
`;
}
