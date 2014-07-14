
// exporter.jsx
//

/**
 * This is the masterpiece of code for this script
 * this function cals itself recursive.
 * So if you have severeal parented layers it will calc
 * all the positions right. ;) But only positions ;(
 *
 * @deprecated This function is cool but not AE style. I use now get_position(layer,time,buffer)
 * HULK SANGRY!
 * @param  {Layer Object} layer the current layer
 * @param  {Number} time  the current time
 * @param  {Array of 3 Values} pos   this if not parented [0,0,0] or the position of the parent layer
 * @return  nothing
 */

var recurs_position = function (layer, time, pos) {

  var res = get_pos_values_at_time(layer, time);
  var x1 = res[0] + pos[0];
  var y1 = res[1] + pos[1];
  var z1 = res[2] + pos[2];

  if (layer.parent === null) {

    global_curr_pos = [x1, y1, z1]; // set the global value
    return;
  } else {

    recurs_position(layer.parent, time, [x1, y1, z1]);
  }
};

/**
 * Recursive fetching layer posiitons is cool but does not solve the parenting problem
 * Wee need to calc the positions a diffrent way
 * Add a buffer layer with an expression that calcs a parented position toWorld
 * thnx to the marvelous Paul Tuersley
 * http://aenhancers.com/viewtopic.php?p=4647
 * also saw this @ http://forums.creativecow.net/thread/227/13960
 * by the inginious Dan Ebberts
 * apply to position of buffer layer to get the world position
 * works 2D and 3D
 * a = thisComp.layer("parented layer");
 * a.toWorld(a.anchorPoint);
 *
 * Gets the position of layers
 * @param  {Layer Object} layer  The Layer to analys
 * @param  {Number Comp Current Time} time   The moment to capture
 * @param  {Layer Object} buffer A NullObject added to the Comp for buffering the positions
 * @return {NOTHING}        Sets a global value. Should return result. Thats better
 * @todo Remove Global object
 */

var get_position = function (layer, time, buffer) {
  var x = 0;
  var y = 0;
  var z = 0;
  var result = [0, 0, 0];
  if (layer.parent !== null) {

    var expr = [];
    expr.push("// obj-vertex-export parent bake expression thnx 2 Paul T. & Dan E.");
    expr.push("var sourceLayer = thisComp.layer(" + layer.index + ");");
    expr.push("sourceLayer.toWorld(sourceLayer.anchorPoint)");

    if (layer.threeDLayer === true) {
      buffer.threeDLayer = true;
    } else {
      buffer.threeDLayer = false;
    }
    // buffer.transform.position.expression = "";
    buffer.transform.position.expression = expr.join("\n");
    result = get_pos_values_at_time(buffer, time);
  } else {
    result = get_pos_values_at_time(layer, time);
  }
  x = result[0];
  y = result[1];
  z = result[2];
  global_curr_pos = [x, y, z]; //

};

/**
 * This is the main function
 * That does all the stuff
 * @param  {Object} objio        Holds al info and settings
 * @param  {Object} errorStrings Holds all error strings
 * @param  {Object} uiStrings    Holds all UI strings
 */

var export_obj = function (objio, uiStrings, errorStrings) {
var timestamp, fn, tf, txtFile;

  app.beginUndoGroup("export obj"); // this is not usefull. You cant make the export go away

  var curComp = app.project.activeItem;
  if (!curComp || !(curComp instanceof CompItem)) {
    alert(errorStrings.noComp);
    return;
  }

  if ((curComp.selectedLayers.length < 1)) {
    alert(errorStrings.noLayer);
    return;
  }


  var selection = curComp.selectedLayers;


  // ------------ So lets write some OBJ ------------


  var newLocation = Folder.selectDialog(uiStrings.selFolder); // select the folder
  if (newLocation === null) return; // if there was an error or the user hits escape

  var buffer = curComp.layers.addNull();
  buffer.name = "buffer";

  if (objio.export.sequence === false) {
    var coords = []; // this will hold single frame coords

    /**
     * This is single frame
     * He takes the valueAtTime so where ever the CTI
     * is he will make an WAVEFRONT OBJ file
     *
     *
     */
    for (var j = 0; j < selection.length; j++) {

      var sel = selection[j];
      writeLn("layer " + sel.name + " number (" + j + "/" + selection.length + ")");
      get_position(sel, curComp.time, buffer);
      // recurs_position(sel,curComp.time,[0,0,0]); // this is neat. Check for parenting recursive ;)
      coords.push("" + global_curr_pos[0] + " " + global_curr_pos[1] + " " + global_curr_pos[2]);

      global_curr_pos = [0, 0, 0];

    } // end of j loop single frame

    // make the time stamp for the file
    var d = new Date();
    var curr_date = d.getDate();
    var curr_month = d.getMonth() + 1; //Months are zero based
    var curr_year = d.getFullYear();
    var curr_hour = d.getHours();
    var curr_min = d.getMinutes();
    var curr_sec = d.getSeconds();

    timestamp = String(curr_year + "_" + pad(curr_month, 2) + "_" + pad(curr_date, 2) + "__" + pad(curr_hour, 2) + "_" + pad(curr_min, 2) + "_" + pad(curr_sec, 2));

    fn = curComp.name + " " + timestamp; // prompt("Enter target file name","myObjFile");
    tf = newLocation.fsName;
    txtFile = new File(tf + "/" + fn + ".obj");
    // now lets wirte all that junk out
    //
    writeArray(txtFile, coords, curComp.name + "", "", objio.settings.writefaces);
    // and give a message to see that everything worked
    uiStrings.wroteMsg(fn, tf);
    // end of singleframe export
  } else {

    // now for the workarea
    var frDur = curComp.frameDuration;
    var waDur = curComp.workAreaDuration;
    var waStart = curComp.workAreaStart;
    var frRate = curComp.frameRate;
    var waLen = waDur * frRate;

    // the time loop
    for (var t = 0; t < waLen; t++) {

      var curFr = waStart + (t * frDur);

      writeLn("Fetching data on frame " + String((curFr * frRate) + 1) + " of " + String(waLen));

      var coordsAtTime = [];

      // the layer loop
      for (var l = 0; l < selection.length; l++) {
        var lyr = selection[l];

        // writeLn("layer "+lyr.name + " number (" + l+"/"+selection.length+")");
        get_position(lyr, curFr, buffer);
        // recurs_position(lyr,curFr,[0,0,0]);// this is neat. Check for parenting recursive ;)
        coordsAtTime.push("" + global_curr_pos[0] + " " + global_curr_pos[1] + " " + global_curr_pos[2]);
        global_curr_pos = [0, 0, 0];

      } // end of l loop layers

      timestamp = pad(t, 6);
      fn = curComp.name + "_" + timestamp;
      tf = newLocation.fsName;
      txtFile = new File(tf + "/" + fn + ".obj");


      writeArray(txtFile,
        coordsAtTime,
        curComp.name + "",
        String("# frame " + timestamp + " of " + waLen + " at fps" + frRate),
        objio.settings.writefaces);

    } // end of t loop time / workarea


    uiStrings.wroteMsg(fn, tf);
  } // end of objio.settings.sequence is true
  buffer.remove();
  app.endUndoGroup();
};// end of obj export


/**
 * Gets the position value at a specific time
 * It gets shortend to 3 digits float
 * @param  {Layer Object} layer the current layer the get the value from
 * @param  {Number Float} time The curent time
 * @return {String}       builds a string that looks like this: "" + x +" " + y + " "+ z
 */

var get_pos_values_at_time = function (layer, time) {
  // var str = "";
  var x = 0.0;
  var y = 0.0;
  var z = 0.0;

  if (layer.parent === null) {

    x = layer.transform.position.valueAtTime(time, false)[0] - (layer.containingComp.width / 2);
    y = layer.transform.position.valueAtTime(time, false)[1] - (layer.containingComp.height / 2);
  } else {
    x = layer.transform.position.valueAtTime(time, false)[0];
    y = layer.transform.position.valueAtTime(time, false)[1];
  }

  if (layer.threeDLayer) {
    z = layer.transform.position.valueAtTime(time, false)[2];
  } else {
    z = 0.0;
  }

  return [x, y, z];
};


// end of exporter