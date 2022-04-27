# metamark

Metamark provides a `getMetamark` function that takes a filepath to a markdown file as input and returns a `Metamark` object as output.

The `Metamark` object contains the markdown content as a string, the transformed html content as a string. A `Metadata` object containing `createdAt`, `updatedAt`, and `slug` content inferred from file stats and filepath. And, a `Toc` data object.

## Todos

- [] make npm package 
- [] infer title of whole doc
- [] infer 'blurb' as first paragraph in text form.
- [] add script to force rename of slug/file based on title?

### Title vs Slug as "Source of Truth"

If the slug was the source of truth you'd lose punctuation content that the title contains. If the title is `Title, and More`, the slug `title-and-more` can be computed, while the inverse is not true, since `Title and More` could be a valid computed title.