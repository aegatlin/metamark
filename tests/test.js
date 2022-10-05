import assert from 'assert/strict'
import { describe, it } from 'node:test'
import { metamark } from '../dist/index.js'

describe('defaults', () => {
  it('works', () => {
    const actual = metamark('./tests/Test File.md')

    assert.deepEqual(actual.title, 'Test File')
    assert.deepEqual(actual.slug, 'test-file')
    assert.deepEqual(actual.route, '/content/test-file')
    assert.deepEqual(actual.firstParagraphText, 'I am a markdown file!')
    assert.deepEqual(actual.frontmatter, {
      public: true,
      tags: ['markdown', 'yaml', 'html'],
    })
    assert.deepEqual(actual.toc, [
      { title: 'Hello', id: 'hello', depth: 1 },
      { title: 'More', id: 'more', depth: 2 },
    ])
  })
})

describe('custom slug and route', () => {
  it('works', () => {
    const actual = metamark('./tests/Test File.md', {
      toSlug: (title) => 'random',
      toRoute: (title) => '/really/odd',
    })

    assert.deepEqual(actual.title, 'Test File')
    assert.deepEqual(actual.slug, 'random')
    assert.deepEqual(actual.route, '/really/odd')
    assert.deepEqual(actual.firstParagraphText, 'I am a markdown file!')
    assert.deepEqual(actual.frontmatter, {
      public: true,
      tags: ['markdown', 'yaml', 'html'],
    })
    assert.deepEqual(actual.toc, [
      { title: 'Hello', id: 'hello', depth: 1 },
      { title: 'More', id: 'more', depth: 2 },
    ])
  })
})
