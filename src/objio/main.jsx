// this is main.jsx
/**
 * main function
 * @param  {[type]} thisObj [description]
 * @return {[type]}         [description]
 */
var run = function(thisObj) {
  /**
   * Check if license already was accepted
   * and save it
   */
  var res = null;
  var settingsSectionName = "obj-io";
  if ((app.settings.haveSetting(settingsSectionName, "licaccept") === true)) {
    var licres = parseInt(app.settings.getSetting(settingsSectionName, "licaccept"));
    if (licres == 1) {
      res = [true, true];
    } else {
      res = objio_licenseDiag("obj-vertex-exporter", website);
    }
  } else {
    res = objio_licenseDiag("obj-vertex-exporter", website);
  }
  if (!res[1]) {
    return;
  }
  if (res[0]) {
    app.settings.saveSetting(settingsSectionName, "licaccept", 1);
  }


  var win = buildUI(thisObj, objio, errorStrings, uiStrings);

};

run(this);

// end of main.jsx