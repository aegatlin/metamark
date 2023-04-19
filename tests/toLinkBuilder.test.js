import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { toLinkBuilder } from '../dist/toLinkBuilder.js'

describe('toLinkBuilder with empty pageAllowSet', () => {
  const toLink = toLinkBuilder(new Set())

  it('returns text', () => {
    assert.deepEqual(toLink('[[Wiki Link]]'), 'Wiki Link')
    assert.deepEqual(toLink('[[Wiki Link | Alias]]'), 'Alias')
  })
})

describe('toLinkBuilder with appropriate pageAllowSet', () => {
  const set = new Set()
  set.add('Wiki Link')
  const toLink = toLinkBuilder(set)

  it('returns links', () => {
    assert.deepEqual(toLink('[[Wiki Link]]'), {
      value: 'Wiki Link',
      uri: '/content/wiki-link',
    })

    assert.deepEqual(toLink('[[Wiki Link#Header Link]]'), {
      value: 'Wiki Link#Header Link',
      uri: '/content/wiki-link#header-link',
    })

    assert.deepEqual(toLink('[[Wiki Link#^block]]'), {
      value: 'Wiki Link',
      uri: '/content/wiki-link',
    })

    assert.deepEqual(toLink('[[#Header Link]]'), {
      value: 'Header Link',
      uri: '#header-link',
    })
  })

  it('returns text for block-links', () => {
    assert.deepEqual(toLink('[[#^block]]'), '')
  })
})


describe('toLinkBuilder with custom get slug function', () => {
  const set = new Set()
  set.add('Wiki Link')
  const toLink = toLinkBuilder(set, (page, toSlug) => ({
    uri: '/custom/content',
    slug: toSlug(`${page}-with-additional-suffix`)
  }))

  it('returns links', () => {
    assert.deepEqual(toLink('[[Wiki Link]]'), {
      value: 'Wiki Link',
      uri: '/custom/content/wiki-link-with-additional-suffix',

    })

    assert.deepEqual(toLink('[[Wiki Link#Header Link]]'), {
      value: 'Wiki Link#Header Link',
      uri: '/custom/content/wiki-link-with-additional-suffix#header-link',
    })

    assert.deepEqual(toLink('[[Wiki Link#^block]]'), {
      value: 'Wiki Link',
      uri: '/custom/content/wiki-link-with-additional-suffix',
    })

    assert.deepEqual(toLink('[[#Header Link]]'), {
      value: 'Header Link',
      uri: '#header-link',
    })
  })

  it('returns text for block-links', () => {
    assert.deepEqual(toLink('[[#^block]]'), '')
  })
})
