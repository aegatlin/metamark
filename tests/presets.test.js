import assert from 'assert/strict'
import { describe, it } from 'node:test'
import { Metamark } from '../dist/index.js'
import { unified } from 'unified'

describe('preset', () => {
  it('works', () => {
    const actual = unified()
      .use(Metamark.preset)
      .processSync('# Hello')
      .toString()
    const expected = '<h1 id="hello"><a href="#hello">Hello</a></h1>'
    assert.deepEqual(actual, expected)
  })
})
