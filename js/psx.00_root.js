/*global $, xhi, psx */
// == BEGIN MODULE psx ================================================
// Create root namespace map 'psx'
xhi._00_root_._makeInstanceFn_( 'psx' );
psx._extendSymbolMapFn_(
  'vMap',
  { _appendChild_    : 'appendChild',
    _change_         : 'change',
    _charAt_         : 'charAt',
    _clone_          : 'clone',
    _fadeOut_        : 'fadeOut',
    _fromCharCode_   : 'fromCharCode',
    _gevent_         : 'gevent',
    _get_            : 'get',
    _hide_           : 'hide',
    _keypress_       : 'keypress',
    _keydown_        : 'keydown',
    _localStorage_   : localStorage,
    _preventDefault_ : 'preventDefault',
    _publish_        : 'publish',
    _remove_         : 'remove'
  }
);
// == . END MODULE psx ================================================
