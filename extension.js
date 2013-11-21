const LayoutManager = imports.ui.main.layoutManager;
const Shell = imports.gi.Shell;

const MessageTray = imports.ui.main.messageTray;
let _myDwell = 0;

function init() { }

function enable() {
    if("_trayPressure" in LayoutManager) {
        LayoutManager._trayPressure._keybindingMode =
            Shell.KeyBindingMode.OVERVIEW;
    }
        
    _myDwell = MessageTray._trayDwellTimeout;
    MessageTray._trayDwellTimeout = function() { return false; };
}

function disable() {
    if("_trayPressure" in LayoutManager) {
        LayoutManager._trayPressure._keybindingMode = 
            Shell.KeyBindingMode.NORMAL | Shell.KeyBindingMode.OVERVIEW;
    }
    
    if(_myDwell) {
        MessageTray._trayDwellTimeout = _myDwell;
        _myDwell = 0;
    }
}
