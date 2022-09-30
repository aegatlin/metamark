# Metamark

A markdown manipulation utility. It returns a robust set of properties relating to a markdown file.

For example, give a [test file](./Test%20File.md), it will return the following:

```js
{
  file: { name: 'Test File', ext: '.md', base: 'Test File.md' },
  title: 'Test File',
  slug: 'test-file',
  frontmatter: { public: true, tags: [ 'markdown', 'yaml', 'html' ] },
  firstParagraphText: 'I am a markdown file!',
  toc: [
    { title: 'Hello', tagName: 'h1', depth: 1, id: 'hello' },
    { title: 'More', tagName: 'h2', depth: 2, id: 'more' }
  ],
  content: {
    rawMd: '...', // omitted for brevity
    md: '...', // omitted for brevity
    mdast: { type: 'root', children: [Array], position: [Object] },
    hast: { type: 'root', children: [Array], position: [Object] },
    html: '<h1 id="hello"><a href="#hello">Hello</a></h1>\n' +
      '<p>I am a markdown file!</p>\n' +
      '<h2 id="more"><a href="#more">More</a></h2>\n' +
      '<p>And a very good one, too!</p>\n' +
      '<pre><code class="hljs language-elixir">d = <span class="hljs-number">3</span>\n' +
      '</code></pre>'
  }
}
```
