/*
eslint-disable es5/no-es6-methods,
es5/no-es6-static-methods,
es5/no-arrow-functions,
es5/no-binary-and-octal-literals,
es5/no-block-scoping,
es5/no-classes,
es5/no-computed-properties,
es5/no-default-parameters,
es5/no-destructuring,
es5/no-exponentiation-operator,
es5/no-for-of,
es5/no-generators,
es5/no-modules,
es5/no-object-super,
es5/no-rest-parameters,
es5/no-shorthand-properties,
es5/no-spread,
es5/no-template-literals,
es5/no-typeof-symbol,
es5/no-unicode-code-point-escape,
es5/no-unicode-regex
*/
const meshkiUtil = {
  TRange: null,
  search (event, str) {
    if (event.keyCode === 13 || event.type === 'click') {
      if (!str && str === "" && str.trim().length <= 0) {
        alert(`متنی برای جستجو ننوشته‌اید.`)
        return
      }
      if (parseInt(navigator.appVersion) < 4) { return }
      let strFound
      if (window.find) {
        strFound = self.find(str)
        if (!strFound) {
          strFound = self.find(str, 0, 1)
          while (self.find(str, 0, 1)) { continue }
        }
      } else if (navigator.appName.indexOf('Microsoft') !== -1) {
        if (meshki.TRange != null) {
          meshki.TRange.collapse(false)
          strFound = meshki.TRange.findText(str)
          if (strFound) { meshki.TRange.select() }
        }
        if (meshki.TRange == null || strFound === 0) {
          meshki.TRange = self.document.body.createTextRange()
          strFound = meshki.TRange.findText(str)
          if (strFound) { meshki.TRange.select() }
        }
      } else if (navigator.appName === 'Opera') {
        alert('این قابلیت از مرورگر اوپرا پشتیبانی نمی‌کند.')
        return
      }
      if (!strFound) { alert(`متن '${str}' یافت نشد!`) }
    }
  }
}
