const PointerWatcher = imports.ui.pointerWatcher;
const TrayPressure = imports.ui.main.layoutManager._trayPressure

_myWatch = 0;
_myTrigger = 0;

function init() { }
    
function disable() {
    if(_myWatch) {
        PointerWatcher.getPointerWatcher()._watches = [_myWatch];
        _myWatch = 0;
    }
    if(_myTrigger) {
        TrayPressure._trigger = _myTrigger;
        _myTrigger = 0;
    }
}
   
function enable() {
    pw = PointerWatcher.getPointerWatcher();
    if(pw._watches.length > 0) {
        _myWatch = PointerWatcher.getPointerWatcher()._watches[0];
        PointerWatcher.getPointerWatcher()._watches[0].remove();
    }
    _myTrigger = TrayPressure._trigger;
    TrayPressure._trigger = function() { return; };
}
