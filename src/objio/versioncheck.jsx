
  //  __  __ __  __
  // |  \/  |  \/  |
  // | \  / | \  / |
  // | |\/| | |\/| |
  // | |  | | |  | |
  // |_|  |_|_|  |_|

// taken from keyTweak.jsx thanks Mathias Möhl
// http://www.mamoworld.com/
// works on any localization
//~ alert(check_readwriteAccess());

var check_readwriteAccess = function(){
var securitySetting = app.preferences.getPrefAsLong("Main Pref Section","Pref_SCRIPTING_FILE_NETWORK_SECURITY");
var result = (securitySetting == 1); // 0 is true 1 is false
  return result;
};

var ux = {
'rwAccess' : false,
'messages':{
  'rwAccess': "To use the script you need to allow the script to read and write to disk.\nGo to  Edit > Preferences > General (Windows) or After Effects > Preferences > General (Mac OS), and select the Allow Scripts To Write Files And Access Network option.\nRead more about it there --> http://help.adobe.com/en_US/aftereffects/cs/using/WSD2616887-A41E-4a39-85FE-957B9D2D3843.html#WS725e431141e7ba651172e0811eb8e35012-8000"
  }
};

ux.rwAccess = check_readwriteAccess() ? true : false;


if(!ux.rwAccess){
  alert(ux.messages.rwAccess);

  //  Kevin 2013-07-19 >
  //  Give those bastards a last chance to tick the checkbox:
  app.executeCommand(2359);

  //  Check if they did
  if(!check_readwriteAccess()){
  //  They didn't ... I'm out of here
    return;
  }
  //  < Kevin 2013-07-19
}
