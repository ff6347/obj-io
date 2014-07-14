var import_obj = function(objio) {

  if(objio.import.sequence === false){
  objio.import.textlines = filereader();
  if (DEBUG) $.writeln(objio.import.textlines);
  loader = new OBJLoader();
  loader.parse(objio.import.textlines.join("\n"));
  var num = (loader.geometrys[0].positions.length/3);
  alert("OBJ with "+num +" verticies\n"+loader.geometrys.toSource());

  }else{
    alert("this should be multi file import");
  }
};