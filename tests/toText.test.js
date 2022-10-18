import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { Metamark } from '../dist/index.js'

describe('toText', () => {
  it('works', () => {
    assert.deepEqual(Metamark.toText('## Wow'), 'Wow')
  })
})
