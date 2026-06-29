// Shared jsdom helpers for exercising Meshki's browser scripts (meshki.js, finder.js)
// as real <script> elements, the same way the docs/site load them.
import { JSDOM } from 'jsdom'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const root = new URL('../', import.meta.url)

export function repoPath (rel) {
  return fileURLToPath(new URL(rel, root))
}

export function makeDom (html, opts = {}) {
  return new JSDOM(html, { runScripts: 'dangerously', ...opts })
}

// Injects a repo script into the realm and executes it synchronously,
// exactly like a <script src> tag would.
export function injectScript (dom, relPath) {
  const script = dom.window.document.createElement('script')
  script.textContent = readFileSync(repoPath(relPath), 'utf-8')
  dom.window.document.body.appendChild(script)
}

// Surfaces a top-level `const`/`let` binding from a loaded script (which is a
// global lexical binding, not a window property) as `window[name]` for assertions.
export function exposeGlobal (dom, name) {
  const script = dom.window.document.createElement('script')
  script.textContent = `window[${JSON.stringify(name)}] = ${name}`
  dom.window.document.body.appendChild(script)
  return dom.window[name]
}

// Resolves once the document has finished parsing (readyState !== 'loading').
export function whenReady (dom) {
  return new Promise((resolve) => {
    if (dom.window.document.readyState !== 'loading') return resolve()
    dom.window.document.addEventListener('DOMContentLoaded', () => resolve())
  })
}
