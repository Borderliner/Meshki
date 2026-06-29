import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { makeDom, injectScript, whenReady } from '../test-utils/dom.js'

const MESHKI = 'src/js/meshki.js'

function page (sidenavClass) {
  const sidenav = sidenavClass ? `<div class="${sidenavClass}"></div>` : ''
  return `<!doctype html><html><body>${sidenav}<div class="container"></div></body></html>`
}

// Override getComputedStyle so direction / --sidenav-width are deterministic
// (jsdom does not compute CSS custom properties from stylesheets).
function stubStyles (dom, { direction = 'ltr', sidenavWidth = '' } = {}) {
  dom.window.getComputedStyle = function () {
    return {
      getPropertyValue: function (prop) {
        if (prop === 'direction') return direction
        if (prop === '--sidenav-width') return sidenavWidth
        return ''
      }
    }
  }
}

function setInnerWidth (dom, width) {
  Object.defineProperty(dom.window, 'innerWidth', { value: width, configurable: true })
}

const overlayCount = (dom) => dom.window.document.getElementsByClassName('overlay').length

describe('meshki.js — ready()/setupOverlay()', () => {
  it('creates the overlay when the document is already parsed (defer / injected after load)', async () => {
    // This is the core ready() regression: with the old onreadystatechange
    // handler, a script that runs after the document is complete never fired.
    const dom = makeDom(page('sidenav'))
    await whenReady(dom)
    assert.notEqual(dom.window.document.readyState, 'loading')
    injectScript(dom, MESHKI)
    assert.equal(overlayCount(dom), 1)
  })

  it('still creates the overlay when injected during parsing', async () => {
    const dom = makeDom(page('sidenav'))
    injectScript(dom, MESHKI)
    assert.equal(overlayCount(dom), 0) // deferred until DOMContentLoaded
    await whenReady(dom)
    assert.equal(overlayCount(dom), 1)
  })

  it('does not create an overlay when there is no sidenav', async () => {
    const dom = makeDom('<!doctype html><html><body></body></html>')
    await whenReady(dom)
    injectScript(dom, MESHKI)
    assert.equal(overlayCount(dom), 0)
  })
})

describe('meshki.js — isRTL()', () => {
  it('reflects the computed direction of the document body', async () => {
    const dom = makeDom(page('sidenav'))
    await whenReady(dom)
    injectScript(dom, MESHKI)
    stubStyles(dom, { direction: 'rtl' })
    assert.equal(dom.window.meshki.isRTL(), true)
    stubStyles(dom, { direction: 'ltr' })
    assert.equal(dom.window.meshki.isRTL(), false)
  })
})

describe('meshki.js — openSidenav() / closeSidenav()', () => {
  async function setup (opts = {}) {
    const dom = makeDom(page(opts.push ? 'sidenav push' : 'sidenav'))
    await whenReady(dom)
    injectScript(dom, MESHKI) // sidenav present + already parsed => overlay created now
    setInnerWidth(dom, opts.innerWidth ?? 1024)
    stubStyles(dom, { direction: opts.direction ?? 'ltr', sidenavWidth: opts.sidenavWidth ?? '' })
    const doc = dom.window.document
    return {
      dom,
      meshki: dom.window.meshki,
      body: doc.body,
      sidenav: doc.getElementsByClassName('sidenav')[0],
      container: doc.getElementsByClassName('container')[0],
      overlay: doc.getElementsByClassName('overlay')[0]
    }
  }

  it('opens a push sidenav on desktop and pushes the container (LTR)', async () => {
    const { meshki, sidenav, container, overlay, body } = await setup({ push: true, sidenavWidth: '300px' })
    meshki.openSidenav()
    assert.equal(sidenav.style.width, '300px')
    assert.equal(container.style.marginLeft, '300px')
    assert.equal(container.style.marginRight, '')
    assert.equal(body.style.overflowX, 'hidden')
    assert.equal(overlay.style.visibility, 'visible')
    assert.equal(String(overlay.style.opacity), '0.55')
  })

  it('pushes the container to the right side in RTL', async () => {
    const { meshki, container } = await setup({ push: true, direction: 'rtl', sidenavWidth: '300px' })
    meshki.openSidenav()
    assert.equal(container.style.marginRight, '300px')
    assert.equal(container.style.marginLeft, '')
  })

  it('falls back to 275px when --sidenav-width is unset', async () => {
    const { meshki, sidenav } = await setup({ push: true })
    meshki.openSidenav()
    assert.equal(sidenav.style.width, '275px')
  })

  it('does not push the container at mobile widths', async () => {
    const { meshki, sidenav, container } = await setup({ push: true, innerWidth: 500, sidenavWidth: '300px' })
    meshki.openSidenav()
    assert.equal(sidenav.style.width, '300px')
    assert.equal(container.style.marginLeft, '')
  })

  it('closeSidenav() collapses width, resets both margins and restores overflow-x', async () => {
    const { meshki, sidenav, container, overlay, body } = await setup({ push: true, sidenavWidth: '300px' })
    meshki.openSidenav()
    meshki.closeSidenav()
    assert.match(sidenav.style.width, /^0(px)?$/)
    assert.match(container.style.marginLeft, /^0(px)?$/)
    assert.match(container.style.marginRight, /^0(px)?$/)
    assert.equal(body.style.overflowX, '') // regression: overflow-x used to stay 'hidden'
    assert.equal(overlay.style.visibility, 'hidden')
    assert.equal(String(overlay.style.opacity), '0')
  })

  it('does not throw when the sidenav / container / overlay are absent', async () => {
    const dom = makeDom('<!doctype html><html><body></body></html>')
    await whenReady(dom)
    injectScript(dom, MESHKI)
    const meshki = dom.window.meshki
    assert.doesNotThrow(() => meshki.openSidenav())
    assert.doesNotThrow(() => meshki.closeSidenav())
  })
})
