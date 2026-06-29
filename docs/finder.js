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
      if (!str || str.trim().length <= 0) {
        alert('Nothing to search for. Please enter a text.')
        return
      }
      if (parseInt(navigator.appVersion, 10) < 4) { return }
      let strFound
      if (window.find) {
        strFound = window.find(str)
        // If not found from the current position, wrap around and try once more.
        if (!strFound) {
          strFound = window.find(str, false, false, true)
        }
      } else if (navigator.appName.indexOf('Microsoft') !== -1) {
        if (meshkiUtil.TRange != null) {
          meshkiUtil.TRange.collapse(false)
          strFound = meshkiUtil.TRange.findText(str)
          if (strFound) { meshkiUtil.TRange.select() }
        }
        if (meshkiUtil.TRange == null || strFound === 0) {
          meshkiUtil.TRange = self.document.body.createTextRange()
          strFound = meshkiUtil.TRange.findText(str)
          if (strFound) { meshkiUtil.TRange.select() }
        }
      } else if (navigator.appName === 'Opera') {
        alert('Opera browsers not supported, sorry...')
        return
      }
      if (!strFound) { alert(`String '${str}' not found!`) }
    }
  }
}
