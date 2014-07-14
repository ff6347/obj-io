//this is ui.jsx
//

/**
 * This will hold all error Messages
 * @type {Object}
 */

var errorStrings = {};
errorStrings.noComp = "Please select a compsition";
errorStrings.noLayer = "Please select at least one laxer.";

var uiStrings = {};
uiStrings.selFolder = "Select a output folder...";
/**
 * Message for the end of the script
 * wrote file to location
 *
 * @param  {String} fn the file name
 * @param  {String}   tf The target folder
 */
uiStrings.wroteMsg = function(fn, tf) {
  alert("wrote: " + fn + ".obj\nto folder: " + tf);
};


var buildUI = function(thisObj, objio, errorStrings, uiStrings) {
  var win = (thisObj instanceof Panel) ? thisObj : new Window('palette', 'obj-vertex-export', [0, 0, 150, 260], {
    resizeable: true
  });

  if (win !== null) {

    var H = 25; // the height
    var W = 30; // the width
    var G = 5; // the gutter
    var x = G;
    var y = G;
    // var yuioff = G; // and some offset

    win.export_sequence_check = win.add('checkbox', [x, y, x + W * 2, y + H], 'seq O');
    win.export_sequence_check.value = objio.export.sequence;
    win.export_button = win.add('button', [x + W * 2 - G * 2, y, x + W * 5, y + H], 'export');
    win.help_button = win.add('button', [x + W * 5 + G, y, x + W * 6, y + H], '?');
    y = y + H + G;
    win.import_sequence_check = win.add('checkbox', [x, y, x + W * 2, y + H], 'seq I');
    win.import_sequence_check.value = objio.import.sequence;

    win.import_button = win.add('button',[x + W*2 -G *2,y, x + W*5, y +H],'import');

    win.export_sequence_check.onClick = function() {
      objio.export.sequence = this.value;
    };
    win.import_sequence_check.onClick = function() {
      objio.import.sequence = this.value;
    };
    win.help_button.onClick = function() {
      alert(objio.helpString.join("\n"));
    };
    win.export_button.onClick = function() {
      export_obj(objio, uiStrings, errorStrings);
    };

    win.import_button.onClick = function() {
      import_obj(objio);
    };

  }
  return win;
}; // end buildUI
/*
This is the license dialoge that shows up
on startup. If you dont tell him to go away

*/
/**
 * [objio_licenseDiag description]
 * @param  {[type]} n       [description]
 * @param  {[type]} website [description]
 * @return {[type]}
 */
var objio_licenseDiag = function(n, website) {
  var lic = "DONT USE SCRIPTS FROM UNTRUSETED SOURCES! ALWAYS DOWNLOAD THIS SCRIPT @ " + website + "/\n\n" +
    "You have to allow the script to read and write to disk.\nso if you obtained this script from any other source then the above mentioned" +
    "\nIT COULD INCLUDE MALICIOUS CODE!\nBy confirming this dialog you also accept the license agreement below\n" +
    "\nLICENSES\n" + "Copyright (c)  2012 Fabian \"fabiantheblind\" Morón Zirfas\n" +
    "Permission is hereby granted, free of charge*, to any person obtaining a copy of this " +
    "software and associated documentation files (the \"Software\"), to deal in the Software " +
    "without restriction, including without limitation the rights to use, copy, modify " +
    "the Software, and to permit persons to whom the Software is furnished to do so, subject to the following " +
    "conditions:\n" +
    "The above copyright notice and this permission notice shall be included in all copies " +
    "or substantial portions of the Software.\n" +
    "THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, " +
    "INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A " +
    "PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT " +
    "HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF " +
    "CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE " +
    "OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\n" +
    "see also http://www.opensource.org/licenses/mit-license.php\n\n" +
    "*if you want to donate something so I can buy cookies and beer\ndo it via aescripts.com\n";

  var diag = new Window("dialog", n + " || readme and license agreement");
  diag.preferredSize = {
    "width": 450,
    "height": 450
  };
  var pan = diag.add('group', undefined, '');
  pan.orientation = 'column';
  var txt = pan.add('edittext', undefined, lic, {
    multiline: true,
    scrolling: false
  });
  txt.preferredSize = {
    "width": 440,
    "height": 430
  };
  var btg = pan.add("group");
  var cbg = btg.add("group");
  cbg.alignment = "left";
  var cb = cbg.add("checkbox", undefined, "dont warn me again");
  btg.orientation = 'row';
  btg.alignment = "right";
  btg.add("button", undefined, "OK");
  btg.add("button", undefined, "cancel");
  if (diag.show() == 1) {
    return [cb.value, true];
  } else {
    return [false, false];
  }
};


///   THIS WILL CHECK IF PANEL IS DOCKABLE OR FLAOTING WINDOW
var win = buildUI(thisObj, objio, errorStrings, uiStrings);
if ((win !== null) && (win instanceof Window)) {
  win.center();
  win.show();
} // end if win  null and not a instance of window
// end of ui.jsx