import { describe, it, before } from 'node:test'
import assert from 'node:assert/strict'
import * as sass from 'sass'
import { fileURLToPath } from 'node:url'
import { readdirSync, readFileSync } from 'node:fs'

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

describe('scss — Phase 2 accessibility', () => {
  let main
  before(() => { main = compile('src/scss/main.scss') })

  it('no focus indicator is removed with an un-overridable !important', () => {
    assert.doesNotMatch(main, /outline:\s*(0|none)\s*!important/)
  })

  it('buttons expose a :focus-visible ring', () => {
    assert.match(main, /button:focus-visible[\s\S]*?\{[^}]*outline:\s*2px solid/)
  })

  it('text inputs/select expose a :focus-visible ring', () => {
    assert.match(main, /input\[type=text\]:focus-visible/)
    assert.match(main, /select:focus-visible/)
  })

  it('checkbox/radio focus is shown on the visible ::before box', () => {
    assert.match(main, /input\[type=checkbox\]:focus-visible \+ label\.checkbox::before/)
    assert.match(main, /input\[type=radio\]:focus-visible \+ label\.radio::before/)
  })

  it('range input exposes a :focus-visible ring', () => {
    assert.match(main, /input\[type=range\]:focus-visible/)
  })

  it('sidenav links and close button expose a :focus-visible ring', () => {
    assert.match(main, /\.sidenav a:focus-visible/)
    assert.match(main, /\.sidenav-close-button:focus-visible/)
  })

  it('.button-couple middle buttons stay interactive (pointer-events restored)', () => {
    assert.match(main, /pointer-events:\s*auto/)
  })

  it('navbar dropdown opens on :focus-within (keyboard accessible)', () => {
    assert.match(main, /\.nav-dropdown:focus-within/)
  })
})

describe('scss — Phase 3 correctness & cleanup', () => {
  let main
  before(() => { main = compile('src/scss/main.scss') })

  it('switch glow colours match their borders (off-by-one typos fixed)', () => {
    // Sass renders the 8-digit hex as rgba(); the RGB must equal each border colour.
    assert.match(main, /rgba\(9,\s*116,\s*241/) // #0974f1 blue
    assert.match(main, /rgba\(46,\s*204,\s*113/) // #2ecc71 green
    assert.match(main, /rgba\(230,\s*126,\s*34/) // #e67e22 orange
    assert.match(main, /rgba\(231,\s*76,\s*60/) // #e74c3c red
    // the old off-by-one channels are gone
    assert.doesNotMatch(main, /rgba\(9,\s*117,\s*241|rgba\(46,\s*204,\s*112|rgba\(230,\s*125,\s*34|rgba\(231,\s*77,\s*60/)
  })

  it('overlay sits above the navbar but below the sidenav', () => {
    assert.match(main, /\.overlay\s*\{[^}]*z-index:\s*9/)
  })

  it('<pre> preserves formatting (white-space is not collapsed)', () => {
    assert.match(main, /\bpre\s*\{[^}]*white-space:\s*pre-wrap/)
  })

  it('drops the obsolete prefixed/!important button transitions', () => {
    assert.doesNotMatch(main, /-moz-transition|-o-transition/)
    assert.doesNotMatch(main, /transition:\s*all\s*\.3s\s*!important/)
  })

  it('grid column widths are unchanged by the math cleanup (still sum correctly)', () => {
    // representative widths from column-width(): 1 -> 4.6667%, 12 columns use 100%
    assert.match(main, /\.col\.one\s*\{[^}]*width:\s*4\.6+\d*%/)
    assert.match(main, /\.col\.twelve\s*\{[^}]*width:\s*100%/)
  })
})

describe('scss — Phase 4 de-duplication (output-equivalent @each loops)', () => {
  let main, ebc
  before(() => {
    main = compile('src/scss/main.scss')
    ebc = compile('src/scss/plugins/extra-button-colors/main.scss')
  })

  it('the @each loop generates all base button colours + states', () => {
    for (const c of ['blue', 'green', 'red', 'orange']) {
      assert.match(main, new RegExp(`a\\.button\\.${c},`), `${c} base rule missing`)
      assert.match(main, new RegExp(`a\\.button\\.${c}:hover`), `${c} :hover missing`)
      assert.match(main, new RegExp(`a\\.button\\.${c}:active`), `${c} :active missing`)
    }
  })

  it('the @each loop generates all 8 extra button colours', () => {
    for (const c of ['yellow', 'crimson', 'purple', 'lime', 'brown', 'space', 'rose', 'cyan']) {
      assert.match(ebc, new RegExp(`a\\.button\\.${c},`), `${c} extra button missing`)
    }
  })

  it('the @each loop generates all form-validation states', () => {
    for (const s of ['error', 'warning', 'success']) {
      assert.match(main, new RegExp(`select\\.${s}\\b`), `${s} state missing`)
    }
  })
})

describe('scss — Phase 5 @use migration', () => {
  let main
  before(() => { main = compile('src/scss/main.scss') })

  it('emits --general-animation-duration exactly once (duplicate :root gone)', () => {
    assert.equal(count(main, '--general-animation-duration'), 1)
  })

  it('the whole tree uses @use — no remaining Sass @import', () => {
    const files = []
    const walk = (dir) => {
      for (const e of readdirSync(dir, { withFileTypes: true })) {
        const full = `${dir}/${e.name}`
        if (e.isDirectory()) walk(full)
        else if (e.name.endsWith('.scss')) files.push(full)
      }
    }
    walk(p('src/scss'))
    assert.ok(files.length > 20, 'should have scanned the scss tree')
    for (const f of files) {
      // Sass string imports are deprecated; `@import url(...)` for web fonts is allowed.
      assert.doesNotMatch(readFileSync(f, 'utf-8'), /@import\s+['"]/, `${f} still uses a Sass @import`)
    }
  })
})
