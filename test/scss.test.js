import { describe, it, before } from 'node:test'
import assert from 'node:assert/strict'
import * as sass from 'sass'
import { fileURLToPath } from 'node:url'

const p = (rel) => fileURLToPath(new URL(rel, new URL('../', import.meta.url)))
const compile = (rel) => sass.compile(p(rel)).css
const count = (haystack, needle) => haystack.split(needle).length - 1

describe('scss — Phase 1 correctness fixes', () => {
  let main, rtl
  before(() => {
    main = compile('src/scss/main.scss')
    rtl = compile('src/scss/plugins/rtl/main.scss')
  })

  it('emits the colored-button rules once (duplicate @import removed)', () => {
    assert.equal(count(main, 'a.button.blue,'), 1, 'a.button.blue should appear exactly once')
  })

  it("styles each element's own ::-webkit-scrollbar (no descendant combinator)", () => {
    assert.match(main, /html::-webkit-scrollbar\b/)
    assert.match(main, /\.sidenav::-webkit-scrollbar\b/)
    assert.doesNotMatch(main, /html ::-webkit-scrollbar/) // the buggy descendant form
    assert.doesNotMatch(main, /\.sidenav ::-webkit-scrollbar/)
  })

  it('emits a valid flex-flow keyword for .flow-col', () => {
    assert.match(main, /\.flexbox\.flow-col\s*\{[^}]*flex-flow:\s*column/)
    assert.doesNotMatch(main, /flex-flow:\s*col;/) // invalid keyword
  })

  it('RTL: offset columns reset the base left margin (no double margin)', () => {
    // The grouped reset rule lists offset columns together and zeroes margin-left.
    assert.match(rtl, /\.col\.offset-by-one,[\s\S]*?\{\s*margin-left:\s*0/)
  })

  it('RTL: mirrors the offset-by-half and offset-by-two-third aliases', () => {
    assert.match(rtl, /\.col\.offset-by-half[,\s]/)
    assert.match(rtl, /\.col\.offset-by-two-third[,\s]/) // singular alias, not the plural
  })
})
