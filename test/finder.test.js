import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { makeDom, injectScript, exposeGlobal } from '../test-utils/dom.js'

// finder.js and its RTL twin share identical logic; only the alert strings differ.
const FINDERS = [
  {
    name: 'docs/finder.js',
    file: 'docs/finder.js',
    empty: 'Nothing to search for. Please enter a text.',
    notFound: (s) => `String '${s}' not found!`
  },
  {
    name: 'docs/rtl/finder-rtl.js',
    file: 'docs/rtl/finder-rtl.js',
    empty: 'متنی برای جستجو ننوشته‌اید.',
    notFound: (s) => `متن '${s}' یافت نشد!`
  }
]

function loadFinder (file) {
  const dom = makeDom('<!doctype html><html><body></body></html>')
  const alerts = []
  dom.window.alert = (msg) => alerts.push(msg)
  injectScript(dom, file)
  // `meshkiUtil` is declared with `const`, so it is a global lexical binding
  // (reachable by later scripts) rather than a property of window.
  const util = exposeGlobal(dom, 'meshkiUtil')
  return { dom, util, alerts }
}

for (const f of FINDERS) {
  describe(f.name, () => {
    it('ignores events that are neither Enter nor a click', () => {
      const { util, alerts, dom } = loadFinder(f.file)
      let calls = 0
      dom.window.find = () => { calls++; return true }
      util.search({ keyCode: 65, type: 'keydown' }, 'hello')
      assert.equal(alerts.length, 0)
      assert.equal(calls, 0)
    })

    it('rejects empty input on Enter', () => {
      const { util, alerts, dom } = loadFinder(f.file)
      let calls = 0
      dom.window.find = () => { calls++; return true }
      util.search({ keyCode: 13 }, '')
      assert.deepEqual(alerts, [f.empty])
      assert.equal(calls, 0)
    })

    it('rejects whitespace-only input (regression: the && guard let it through)', () => {
      const { util, alerts, dom } = loadFinder(f.file)
      let calls = 0
      dom.window.find = () => { calls++; return true }
      util.search({ type: 'click' }, '    ')
      assert.deepEqual(alerts, [f.empty])
      assert.equal(calls, 0)
    })

    it('finds a term via window.find without looping forever', () => {
      const { util, alerts, dom } = loadFinder(f.file)
      let calls = 0
      // miss at the cursor, hit on the wrap-around pass
      dom.window.find = () => { calls++; return calls > 1 }
      util.search({ keyCode: 13 }, 'hello')
      assert.equal(calls, 2) // exactly initial + one wrap-around — never the old infinite while-loop
      assert.equal(alerts.length, 0)
    })

    it('alerts "not found" after a bounded number of find() calls', () => {
      const { util, alerts, dom } = loadFinder(f.file)
      let calls = 0
      dom.window.find = () => { calls++; return false }
      util.search({ keyCode: 13 }, 'zzz')
      assert.equal(calls, 2)
      assert.deepEqual(alerts, [f.notFound('zzz')])
    })

    it('uses meshkiUtil.TRange (not an undefined global) on the legacy IE path', () => {
      const { util, dom } = loadFinder(f.file)
      dom.window.find = undefined // force the IE/TextRange branch
      Object.defineProperty(dom.window.navigator, 'appName', { value: 'Microsoft Internet Explorer', configurable: true })
      Object.defineProperty(dom.window.navigator, 'appVersion', { value: '5.0', configurable: true })
      let selected = false
      const fakeRange = { collapse () {}, findText () { return true }, select () { selected = true } }
      dom.window.document.body.createTextRange = () => fakeRange
      // Old code referenced `meshki.TRange` (undefined here) → ReferenceError.
      assert.doesNotThrow(() => util.search({ keyCode: 13 }, 'foo'))
      assert.equal(util.TRange, fakeRange)
      assert.equal(selected, true)
    })
  })
}
