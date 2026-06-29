// Compares two snapshot JSON files element-by-element and reports every
// computed-style difference with context. Exit 0 = identical, 1 = differences.
const fs = require('fs')
const a = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'))
const b = JSON.parse(fs.readFileSync(process.argv[3], 'utf8'))
const diffs = []
for (let si = 0; si < a.length; si++) {
  const sa = a[si]; const sb = b[si]
  if (!sb) { diffs.push(`scene ${si} missing in B`); continue }
  for (let ei = 0; ei < sa.els.length; ei++) {
    const ea = sa.els[ei]; const eb = sb.els[ei]
    if (!eb) { diffs.push(`${sa.mode}@${sa.w} el#${ei} missing in B`); continue }
    for (const p in ea.s) {
      if (ea.s[p] !== eb.s[p]) {
        diffs.push(`${sa.mode}@${sa.w} el#${ei} <${ea.t}${ea.c ? '.' + ea.c.replace(/\s+/g, '.') : ''}> ${p}: "${ea.s[p]}" -> "${eb.s[p]}"`)
      }
    }
  }
}
console.log(`total style diffs: ${diffs.length}`)
diffs.slice(0, 50).forEach((d) => console.log('  ' + d))
process.exit(diffs.length ? 1 : 0)
