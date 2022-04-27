import assert from 'node:assert'
import test from 'node:test'
import { getMetamark } from '../lib/getMetamark.js'
import { i } from '../lib/util.js'

test('processes simple markdowns', (t) => {
  const actualMetamark = getMetamark('test/test-simple.md')

  assert.match(actualMetamark.md, /# Test Simple/)
  assert.match(actualMetamark.html, /<h1>Test Simple/)
  assert(actualMetamark.metadata.createdAt)
  assert(actualMetamark.metadata.updatedAt)
  assert.equal(actualMetamark.metadata.slug, 'test-simple')
  assertArrayEquality(actualMetamark.toc, [])
})

test('processes single-h2 markdown', (t) => {
  const actualMetamark = getMetamark('test/test-single-h2.md')
  const expectedToc = [{ title: 'Chapter One', url: '#chapter-one' }]

  assert.match(actualMetamark.md, /# Test Single H2/)
  assert.match(actualMetamark.html, /<h1>Test Single H2/)
  assert(actualMetamark.metadata.createdAt)
  assert(actualMetamark.metadata.updatedAt)
  assert.equal(actualMetamark.metadata.slug, 'test-single-h2')
  assertArrayEquality(actualMetamark.toc, expectedToc)
})

test('processes double-h2 markdown', (t) => {
  const actualMetamark = getMetamark('test/test-double-h2.md')
  const expectedToc = [
    { title: 'Chapter One', url: '#chapter-one' },
    { title: 'Chapter Two', url: '#chapter-two' },
  ]

  assert.match(actualMetamark.md, /# Test Double H2/)
  assert.match(actualMetamark.html, /<h1>Test Double H2/)
  assert(actualMetamark.metadata.createdAt)
  assert(actualMetamark.metadata.updatedAt)
  assert.equal(actualMetamark.metadata.slug, 'test-double-h2')
  assertArrayEquality(actualMetamark.toc, expectedToc)
})

test('processes single-h2-single-h3 markdown', { only: true }, (t) => {
  const actualMetamark = getMetamark('test/test-single-h2-single-h3.md')
  const expectedToc = [
    {
      title: 'Chapter One',
      url: '#chapter-one',
      children: [{ title: 'Section One', url: '#section-one' }],
    },
  ]

  assert.match(actualMetamark.md, /# Test Single H2, Single H3/)
  assert.match(actualMetamark.html, /<h1>Test Single H2, Single H3/)
  assert(actualMetamark.metadata.createdAt)
  assert(actualMetamark.metadata.updatedAt)
  assert.equal(actualMetamark.metadata.slug, 'test-single-h2-single-h3')
  assertArrayEquality(actualMetamark.toc, expectedToc)
})

function assertArrayEquality(a1, a2) {
  const is1 = Array.isArray(a1)
  const is2 = Array.isArray(a2)
  if (!is1 || !is2) assert.fail(`${i(a1)} or ${i(a2)} is not an array`)

  const l1 = a1.length
  const l2 = a2.length
  if (l1 != l2)
    assert.fail(
      `Unequal array length: ${l1} and ${l2} for ${i(a1)} and ${i(a2)}`
    )

  a1.forEach((v, i) => {
    assert.deepEqual(v, a2[i])
  })
}
