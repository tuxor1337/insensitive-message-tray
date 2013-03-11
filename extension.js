const PointerWatcher = imports.ui.pointerWatcher;

_myWatch = 0;

function init() { }
    
function disable() {
    if(_myWatch) {
        PointerWatcher.getPointerWatcher()._watches = [_myWatch];
        _myWatch = 0;
    }
}
   
function enable() {
    _myWatch = PointerWatcher.getPointerWatcher()._watches[0];
    PointerWatcher.getPointerWatcher()._watches[0].remove();
}
