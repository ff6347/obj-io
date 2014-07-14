//  Kevin 2013-07-19 >
//  Store the AE version to avoid CS5 bugs
var appVersion = parseFloat(app.version.split('x'));
//  < Kevin 2013-07-19

// This is a global variable for recursive layer parenting handling
// This will be overwritten and set to [0,0,0] at the end of every layer analysis
// used in function recurs_position
// type {Array with 3 Numbers x ,y ,z}
var DEBUG = true;
var global_curr_pos = [0, 0, 0];
var website = "http://aescripts.com";
var objio = {};
objio.import = {
  sequence:false,
  textlines : [],
};
objio.export = {
  sequence:false
};
objio.settings = {
  sequence: false,
  /**
   * This is a poor attempt to write faces
   * You cant reach this via UI
   */
  writefaces: false
};


/**
 * This object holds all help info
 * will be joined for display
 * @type {Array of String}
 */
objio.helpString = [];
objio.helpString.push("obj-vertex-export.jsx");

objio.helpString.push("is a simple oneshot script that takes the positions of all selected layers and writes obj verticies from it. It works out of the box with Plexus by Rowbyte.");

objio.helpString.push("\nParenting:\nThis script can export parented layers If you run int o any problems try:\n'Blurrypixel' http://aescripts.com/bake-parented-transform/\n");
objio.helpString.push("Plexus is the only one out of" +
  "Element 3D, Form and Plexus" +
  "who seems to get the obj import right." +
  "I didn't try the atomkraft plugins nor others." +
  "Element 3D and Form get problems with the OBJ files created" +
  "E3D needs faces to import an obj and seems to have problem with negative Z values." +
  "Its pretty wired. So I disabled that for the moment." +
  "Form also does not get the world right." +
  "No offense I love E3D and Form but" +
  "Plexus eats these OBJ files out of the box." +
  "But hey. You still can have fun with this script.");
objio.helpString.push("" +
  "Trapcode Form Quirks:  " +
  "- Form needs no faces. He finds the verticies" +
  "- better shut of normalize" +
  "- To get something that is near to but not fully right" +
  " Set the Basefrom x to your obj comps x" +
  " Set the Basefrom y to your obj comps y" +
  " Set the Basefrom z to your obj comps z" +
  " But still. It is not fully right." +
  " Fiddle with the z offset" +
  " you need to offset the center z of the Base Form");
objio.helpString.push("" +
  "Videocopilot Element 3D Quirks:  " +
  "E3D needs faces in the obj. If there are only verticies he does not find anything at all" +
  "E3D seems to read only positive values" +
  "E3D scaleing is offseted" +
  "E3D position is offseted" +
  "E3D writing all v's to faces does not solve the problem so it is deactivated");