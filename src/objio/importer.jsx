var import_obj = function(objio) {
    var curComp = app.project.activeItem;
  if (!curComp || !(curComp instanceof CompItem)) {
    alert('please select a comp');
    return;
  }

  if (objio.import.sequence === false) {

    var textlinesArr = filereader();
    objio.import.textlines.push(textlinesArr);
    if (DEBUG) $.writeln(objio.import.textlines);

  } else {
    // alert("this should be multi file import");
    var textlinesArrs = multifilereader();
    for (var i = 0; i < textlinesArrs.length; i++) {
      objio.import.textlines.push(textlinesArrs[i]);
    }
  }
  // loader = new OBJLoader();
  // loader.parse(objio.import.textlines[0].join("\n"));
  // var num = (loader.geometrys[0].positions.length/3);
  // alert("OBJ with "+num +" verticies\n"+loader.geometrys.toSource());

  // at this point we should have:
  //
  // an Array or multiple Arrays of text line Arrays in objio.import.textlines

  var loaders = []; // will hold all the obj parsers
  for (var j = 0; j < objio.import.textlines.length; j++) {
    var loader = new OBJLoader();
    loader.parse(objio.import.textlines[j].join("\n"));
    loaders.push(loader);
    // now we should have 'n' OBJLoader objects with 'n' verticies
    // we can start creating the content of the comp
  }


  app.beginUndoGroup('OBJ Import Place || Objects');
  // only work in the current comp for the moment
  for(var k = 0; k < ){

  }
  app.endUndoGroup();
};