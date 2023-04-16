import assert from 'assert/strict'
import { describe, it } from 'node:test'
import { Metamark } from '../dist/index.js'

describe('Metamark.getMarks', () => {
  it('does not include pages not in the pageAllowSet', () => {
    const pageAllowSet = new Set(['Wiki Link'])
    const actuals = Metamark.getMarks(['./tests/Test File.md'], pageAllowSet)
    assert.deepEqual(actuals, [])
  })

  it('works with simple filePathsList and pageAllowSet', () => {
    const pageAllowSet = new Set(['Test File', 'Wiki Link'])
    const actuals = Metamark.getMarks(['./tests/Test File.md'], pageAllowSet)
    const actual = actuals[0]

    assert.deepEqual(actual.page, 'Test File')
    assert.deepEqual(actual.slug, 'test-file')
    assert.deepEqual(actual.firstParagraphText, 'I am a markdown file!')
    assert.deepEqual(actual.frontmatter, {
      public: true,
      tags: ['markdown', 'yaml', 'html'],
    })
    assert.deepEqual(actual.toc, [
      { title: 'Hello', id: 'hello', depth: 1 },
      { title: 'More', id: 'more', depth: 2 },
    ])
    assert.match(
      actual.html,
      /<a href="\/content\/wiki-link" title="">Wiki Link<\/a>/g
    )
  })

  it('removes links to files not in the pageAllowSet', () => {
    const pageAllowSet = new Set(['Test File'])
    const actuals = Metamark.getMarks(['./tests/Test File.md'], pageAllowSet)
    const actual = actuals[0]

    assert.deepEqual(actual.page, 'Test File')
    assert.deepEqual(actual.slug, 'test-file')
    assert.deepEqual(actual.firstParagraphText, 'I am a markdown file!')
    assert.deepEqual(actual.frontmatter, {
      public: true,
      tags: ['markdown', 'yaml', 'html'],
    })
    assert.deepEqual(actual.toc, [
      { title: 'Hello', id: 'hello', depth: 1 },
      { title: 'More', id: 'more', depth: 2 },
    ])

    assert.match(actual.html, /Wiki Link/)
    assert.doesNotMatch(
      actual.html,
      /<a href="\/content\/wiki-link" title="">Wiki Link<\/a>/g
    )

    assert.match(
      actual.html,
      /<a href="http:\/\/www.google.com" target="_blank" rel="nofollow">external link<\/a>/g
    )


  })
})
