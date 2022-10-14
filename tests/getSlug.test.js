import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { getSlug } from '../dist/getSlug.js'

describe('getSlug', () => {
  it('works', () => {
    assert.deepEqual(getSlug('Wiki Link'), 'wiki-link')
  })

  it('does not break apart words like JavaScript', () => {
    assert.deepEqual(getSlug('JavaScript'), 'javascript')
  })

  it('does not break apart contractions', () => {
    assert.deepEqual(getSlug("Don't repeat yourself"), 'dont-repeat-yourself')
    assert.deepEqual(getSlug("Conway's Law"), 'conways-law')
  })

  it('handles complex possessives', () => {
    assert.deepEqual(getSlug("Dogs' Treats"), 'dogs-treats')
  })
})
