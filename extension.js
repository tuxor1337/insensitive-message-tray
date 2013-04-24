
const MessageTray = imports.ui.main.messageTray;
const LayoutManager = imports.ui.main.layoutManager; 

if("_trayPressure" in LayoutManager)
    _myTrayPressure = LayoutManager._trayPressure;
else _myTrayPressure = 0;
_myDwell = 0;
_myTrigger = 0;

function init() { }
    
function disable() {
    if(_myDwell) {
        MessageTray._trayDwellTimeout = _myDwell;
        _myDwell = 0;
    }
    if(_myTrigger && _myTrayPressure) {
        _myTrayPressure._trigger = _myTrigger;
        _myTrigger = 0;
    }
}
   
function enable() {
    _myDwell = MessageTray._trayDwellTimeout;
    MessageTray._trayDwellTimeout = function() { return false; };
    if(_myTrayPressure) {
        _myTrigger = _myTrayPressure._trigger;
        _myTrayPressure._trigger = function() { return false; };
    }
}
