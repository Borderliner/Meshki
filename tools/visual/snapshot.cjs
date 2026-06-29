// Renders the kitchen-sink fixture with the compiled dist CSS in a real browser
// and dumps the computed style of every element, across viewports and in
// default / light-mode / RTL. Used to prove an !important removal changes no UI:
//   node test/visual/snapshot.cjs /tmp/before.json
//   ...make changes, rebuild...
//   node test/visual/snapshot.cjs /tmp/after.json
//   diff /tmp/before.json /tmp/after.json   # empty => identical rendering
const { chromium } = require('playwright')
const fs = require('fs')
const path = require('path')

const EXE = process.env.CHROME_BIN ||
  path.join(process.env.HOME, '.cache/ms-playwright/chromium-1223/chrome-linux64/chrome')
const ROOT = path.resolve(__dirname, '../..')
const FIXTURE = 'file://' + path.join(__dirname, 'fixture.html')

// Properties the !important rules can influence (cascade outcomes).
const PROPS = [
  'display', 'visibility', 'float', 'position',
  'top', 'right', 'bottom', 'left',
  'margin-top', 'margin-right', 'margin-bottom', 'margin-left',
  'padding-top', 'padding-right', 'padding-bottom', 'padding-left',
  'font-size', 'line-height', 'text-align', 'pointer-events',
  'color', 'background-color',
  'border-top-width', 'border-right-width', 'border-bottom-width', 'border-left-width',
  'border-top-color', 'border-left-color', 'border-top-style',
  'outline-width', 'outline-style', 'outline-color',
  'box-shadow', 'transform', 'width', 'direction'
]

const SCENES = {
  default: ['dist/css/meshki.css', 'dist/plugins/meshki-extra-button-colors.css', 'dist/plugins/meshki-light-mode.css'],
  light: ['dist/css/meshki.css', 'dist/plugins/meshki-extra-button-colors.css', 'dist/plugins/meshki-light-mode.css'],
  rtl: ['dist/css/meshki.css', 'dist/plugins/meshki-rtl.css']
}
const VIEWPORTS = [375, 800, 1280]

;(async () => {
  const out = []
  const browser = await chromium.launch({ executablePath: EXE })
  for (const mode of Object.keys(SCENES)) {
    const css = SCENES[mode].map((f) => fs.readFileSync(path.join(ROOT, f), 'utf8')).join('\n')
    for (const w of VIEWPORTS) {
      const page = await browser.newPage({ viewport: { width: w, height: 1200 } })
      await page.goto(FIXTURE)
      await page.addStyleTag({ content: css })
      // Kill transitions/animations so we capture final resting styles, not
      // mid-transition intermediate values (Meshki uses `transition: all .3s`).
      await page.addStyleTag({ content: '*,*::before,*::after{transition:none!important;animation:none!important}' })
      if (mode === 'light') await page.evaluate(() => document.documentElement.classList.add('light-mode'))
      // Let fonts + layout settle, then capture — rounding sub-pixel values to
      // integers so font/layout jitter is filtered out (real !important effects
      // swap whole declarations, never sub-pixel amounts).
      try { await page.evaluate(() => document.fonts.ready) } catch {}
      await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))))
      const els = await page.evaluate((props) => {
        const round = (v) => v.replace(/-?\d+\.\d+/g, (m) => String(Math.round(parseFloat(m))))
        return Array.from(document.querySelectorAll('body *')).map((el) => {
          const cs = getComputedStyle(el)
          const s = {}
          for (const p of props) s[p] = round(cs.getPropertyValue(p))
          return { t: el.tagName.toLowerCase(), c: el.getAttribute('class') || '', s }
        })
      }, PROPS)
      out.push({ mode, w, count: els.length, els })
      await page.close()
    }
  }
  await browser.close()
  fs.writeFileSync(process.argv[2], JSON.stringify(out, null, 1))
  console.log(`snapshot -> ${process.argv[2]} (${out.length} scenes x ${out[0].els.length} elements)`)
})().catch((e) => { console.error(e); process.exit(1) })
