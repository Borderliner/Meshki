var meshkiUtil = {
  TRange: null,
  search: function(el) {
    if (event.keyCode == 13 || el == true){
      var str = document.getElementById('searchbox').value;
      if (parseInt(navigator.appVersion) < 4)
        return;
      var strFound;
      if (window.find) {
        strFound = self.find(str);
        if (!strFound) {
          strFound = self.find(str,0,1);
          while (self.find(str,0,1))
            continue;
        }
      }
      else if (navigator.appName.indexOf("Microsoft") != -1) {
        if (meshki.TRange != null) {
          meshki.TRange.collapse(false);
          strFound = meshki.TRange.findText(str);
          if (strFound)
            meshki.TRange.select();
        }
        if (meshki.TRange == null || strFound == 0) {
          meshki.TRange = self.document.body.createTextRange();
          strFound = meshki.TRange.findText(str);
          if (strFound)
            meshki.TRange.select();
        }
      }
      else if (navigator.appName == "Opera") {
        alert ("Opera browsers not supported, sorry...")
        return;
      }
      if (!strFound)
        alert ("String '"+str+"' not found!")
      return;
    }
  }
};

