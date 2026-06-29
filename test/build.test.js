import { describe, it, before } from 'node:test'
import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { readFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('../', import.meta.url))
const p = (rel) => fileURLToPath(new URL(rel, new URL('../', import.meta.url)))

const MIN_CSS = [
  'dist/css/meshki.min.css',
  'dist/plugins/meshki-extra-button-colors.min.css',
  'dist/plugins/meshki-rtl.min.css',
  'dist/plugins/meshki-light-mode.min.css'
]

describe('build.js', () => {
  before(() => {
    // Run a real, full build so we assert on the actual published artifacts.
    // Retry: the dart-sass/node build process can rarely segfault in some
    // environments — a transient native crash, not a build error.
    let lastErr
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        execFileSync('node', ['build.js'], { cwd: root, stdio: 'ignore' })
        return
      } catch (err) {
        lastErr = err
      }
    }
    throw lastErr
  })

  it('makes every minified CSS reference a source map that actually exists', () => {
    for (const rel of MIN_CSS) {
      const css = readFileSync(p(rel), 'utf-8')
      const match = css.match(/sourceMappingURL=(\S+?)\s*\*\//)
      assert.ok(match, `${rel} should contain a sourceMappingURL comment`)
      const ref = match[1]
      // Must be the sibling map's basename — no directory prefix, no double slash.
      assert.equal(ref, rel.split('/').pop() + '.map', `${rel} references the wrong map (${ref})`)
      const mapPath = p(rel + '.map')
      assert.ok(existsSync(mapPath), `map referenced by ${rel} must exist on disk`)
      assert.doesNotThrow(() => JSON.parse(readFileSync(mapPath, 'utf-8')), `${ref} must be valid JSON`)
    }
  })

  it('prepends the license header to every licensed artifact (incl. light-mode min)', () => {
    const copying = readFileSync(p('COPYING'), 'utf-8')
    const licensed = ['dist/js/meshki.min.js', ...MIN_CSS]
    for (const rel of licensed) {
      const content = readFileSync(p(rel), 'utf-8')
      assert.ok(content.startsWith(copying), `${rel} should start with the COPYING license header`)
    }
  })

  it('produces a real minified JS bundle (not the literal string "undefined")', () => {
    const js = readFileSync(p('dist/js/meshki.min.js'), 'utf-8')
    assert.ok(js.length > 200, 'minified JS should have real content')
    assert.doesNotMatch(js, /\bundefined\s*$/, 'minified JS must not end with "undefined"')
    // public API survives minification (object property names are not mangled)
    assert.match(js, /openSidenav/)
    assert.match(js, /closeSidenav/)
  })

  it('copies the unminified JS to dist/js', () => {
    assert.ok(existsSync(p('dist/js/meshki.js')))
  })

  it('does not emit a stale, mis-named map for the unminified CSS', () => {
    // The old build wrote dist/css/meshki.css.map (referenced by nothing).
    assert.ok(!existsSync(p('dist/css/meshki.css.map')), 'stale meshki.css.map should not exist')
  })
})
