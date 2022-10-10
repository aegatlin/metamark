import { obsidianLinkBuilder } from '../dist/obsidianLinkBuilder.js'
import { describe, it } from 'node:test'
import assert from 'node:assert/strict'

describe('obsidianLinkBuilder', () => {
  it('works', () => {
    assert.deepEqual(obsidianLinkBuilder('[[Wiki Link]]'), {
      type: 'page',
      page: 'Wiki Link',
    })

    assert.deepEqual(obsidianLinkBuilder('[[Wiki Link|Alias]]'), {
      type: 'page',
      page: 'Wiki Link',
      alias: 'Alias',
    })

    assert.deepEqual(obsidianLinkBuilder('[[Wiki Link#Header]]'), {
      type: 'page-header',
      page: 'Wiki Link',
      header: 'Header',
    })

    assert.deepEqual(obsidianLinkBuilder('[[Wiki Link#Header|Alias]]'), {
      type: 'page-header',
      page: 'Wiki Link',
      header: 'Header',
      alias: 'Alias',
    })

    assert.deepEqual(obsidianLinkBuilder('[[Wiki Link#^block]]'), {
      type: 'page-block',
      page: 'Wiki Link',
      block: 'block',
    })

    assert.deepEqual(obsidianLinkBuilder('[[Wiki Link#^block | Alias]]'), {
      type: 'page-block',
      page: 'Wiki Link',
      block: 'block',
      alias: 'Alias',
    })

    assert.deepEqual(obsidianLinkBuilder('[[#Header Link]]'), {
      type: 'header',
      header: 'Header Link',
    })

    assert.deepEqual(obsidianLinkBuilder('[[#Header Link | Aliased]]'), {
      type: 'header',
      header: 'Header Link',
      alias: 'Aliased',
    })

    assert.deepEqual(obsidianLinkBuilder('[[#^block]]'), {
      type: 'block',
      block: 'block',
    })

    assert.deepEqual(obsidianLinkBuilder('[[#^block| Alias]]'), {
      type: 'block',
      block: 'block',
      alias: 'Alias',
    })
  })
})
