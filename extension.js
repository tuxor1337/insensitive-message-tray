
const Main = imports.ui.main;
const MessageTray = imports.ui.main.messageTray;
const LayoutManager = imports.ui.main.layoutManager; 

if("_trayPressure" in LayoutManager)
    _myTrayPressure = LayoutManager._trayPressure;
else _myTrayPressure = 0;
_myDwell = 0;
_myTrigger = 0;

_showEvent = 0;
_hideEvent = 0;

function init() { }
    
function disable() {
    if(_showEvent) Main.overview.disconnect(_showEvent);
    if(_hideEvent) Main.overview.disconnect(_hideEvent);
    restore_dwell();
    restore_trigger();
}
   
function enable() {
    suppress_trigger();
    suppress_dwell();
    _showEvent = Main.overview.connect('showing', restore_trigger);
    _hideEvent = Main.overview.connect('hiding', suppress_trigger);
}

function suppress_trigger() {
    if(_myTrayPressure) {
        _myTrigger = _myTrayPressure._trigger;
        _myTrayPressure._trigger = function() { return false; };
    }
}

function restore_trigger() {
    if(_myTrigger && _myTrayPressure) {
        _myTrayPressure._trigger = _myTrigger;
        _myTrigger = 0;
    }
}

function suppress_dwell() {
    _myDwell = MessageTray._trayDwellTimeout;
    MessageTray._trayDwellTimeout = function() { return false; };
}

function restore_dwell() {
    if(_myDwell) {
        MessageTray._trayDwellTimeout = _myDwell;
        _myDwell = 0;
    }
}
