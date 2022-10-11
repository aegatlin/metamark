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
})
