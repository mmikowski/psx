/*
 * 00_root.js
 * @author Michael S. Mikowski - mike.mikowski@gmail.com
 *
 * Use      : xhi._00_root_._makeInstanceFn_( '<namespace_key>', option_map );
 * Synopsis : Create an app_map using named <namespace_key> as the root
 * Provides : An application map containing shared symbols
 * Requires : ---
 *
*/
/*global xhi */
var xhi = {};
// == BEGIN MODULE xhi._00_root_ =======================================
xhi._00_root_ = (function () {
  // == BEGIN MODULE SCOPE VARIABLES ===================================
  'use strict';
  var
    __JSON   = JSON,
    __Math   = Math,
    __Object = Object,
    __undef  = void 0,

    // The nMap and vMap symbols are the minimimum to support the
    // full breadth of xhi client libs. Use the argOptionMap
    // to expand these lists for project specific requirements.
    //
    nMap = {
      _n4_     : -4,
      _n3_     : -3,
      _n2_     : -2,
      _n1_     : -1,
      _d1_     : 0.1,
      _d2_     : 0.2,
      _d5_     : 0.5,
      _0_      : 0,
      _1_      : 1,
      _2_      : 2,
      _3_      : 3,
      _4_      : 4,
      _5_      : 5,
      _6_      : 6,
      _7_      : 7,
      _8_      : 8,
      _9_      : 9,
      _10_     : 10,
      _100_    : 100
    },

    vMap = {
      _Array_           : Array,
      _Date_            : Date,
      _Math_            : __Math,
      _Number_          : Number,
      _Object_          : __Object,
      _String_          : String,

      _clearTimeoutFn_  : clearTimeout,
      _createObjectFn_  : __Object.create,
      _data2strFn_      : __JSON.stringify,
      _makeAbsNumFn_    : __Math.abs,
      _makeFloorNumFn_  : __Math.floor,
      _makeKeyListFn_   : __Object.keys,
      _makeRandomNumFn_ : __Math.random,
      _makeRoundNumFn_  : __Math.round,
      _setTimeoutFn_    : setTimeout,
      _str2dataFn_      : __JSON.parse,
      _typeofFn_        : function ( a ) { return typeof a; },

      _addClass_        : 'addClass',
      _apply_           : 'apply',
      _append_          : 'append',
      _attr_            : 'attr',
      _bind_            : 'bind',
      _blank_           : '',
      _body_            : 'body',
      _call_            : 'call',
      _cancel_          : 'cancel',
      _concat_          : 'concat',
      _css_             : 'css',
      _empty_           : 'empty',
      _false_           : false,
      _filter_          : 'filter',
      _find_            : 'find',
      _getElsByTagName_ : 'getElementsByTagName',
      _hasOwnProperty_  : 'hasOwnProperty',
      _html_            : 'html',
      _indexOf_         : 'indexOf',
      _join_            : 'join',
      _length_          : 'length',
      _map_             : 'map',
      _match_           : 'match',
      _null_            : null,
      _off_             : 'off',
      _on_              : 'on',
      _onload_          : 'onload',
      _outerHeight_     : 'outerHeight',
      _outerWidth_      : 'outerWidth',
      _parse_           : 'parse',
      _pop_             : 'pop',
      _prop_            : 'prop',
      _push_            : 'push',
      _removeAttr_      : 'removeAttr',
      _removeChild_     : 'removeChild',
      _removeClass_     : 'removeClass',
      _replace_         : 'replace',
      _scrollHeight_    : 'scrollHeight',
      _scrollLeft_      : 'scrollLeft',
      _scrollTop_       : 'scrollTop',
      _shift_           : 'shift',
      _show_            : 'show',
      _slice_           : 'slice',
      _sort_            : 'sort',
      _splice_          : 'splice',
      _split_           : 'split',
      _src_             : 'src',
      _status_          : 'status',
      _string_          : 'string',
      _style_           : 'style',
      _submit_          : 'submit',
      _subscribe_       : 'subscribe',
      _substr_          : 'substr',
      _target_          : 'target',
      _text_            : 'text',
      _then_            : 'then',
      _toFixed_         : 'toFixed',
      _toString_        : 'toString',
      _trigger_         : 'trigger',
      _trim_            : 'trim',
      _true_            : true,
      _udragend_        : 'udragend',
      _udragmove_       : 'udragmove',
      _udragstart_      : 'udragstart',
      _uheld_           : 'uheld',
      _uheldend_        : 'uheldend',
      _uheldmove_       : 'uheldmove',
      _uheldstart_      : 'uheldstart',
      _undef_           : __undef,
      _unshift_         : 'unshift',
      _unsubscribe_     : 'unsubscribe',
      _utap_            : 'utap',
      _val_             : 'val'
    }
    ;
  // == . END MODULE SCOPE VARIABLES ===================================

  // == BEGIN PUBLIC METHODS ===========================================
  // BEGIN public method /getGlobalObjFn/
  function getGlobalObjFn () {
    var global_obj;
    try { global_obj = window; }
    catch ( ignore ) { global_obj = global; }
    if ( ! global_obj ) { throw '_no_global_object_found_'; }
    return global_obj;
  }
  // . END public method /getGlobalObjFn/

  // BEGIN public method /makeInstanceFn/
  function makeInstanceFn ( aKey, arg_option_map ) {
    var
      instanceNmap = Object.assign( {}, nMap ),
      instanceVmap = Object.assign( {}, vMap ),
      option_map = vMap._typeofFn_( arg_option_map ) === 'object'
        ? arg_option_map : {},

      global_obj, instance_map
      ;

    // BEGIN public method /extendSymbolMapFn/
    // Purpose : Expand symbol maps as needed for project
    // Example :
    //   xhi._00_root_._extendSymbolMapFn_(
    //     'vMap',  { _user_name_: 'Fred' }
    //   );
    // This sets xhi._vMap_._user_name_ === 'Fred'
    //
    function extendSymbolMapFn ( symbol_key, extend_map ) {
      var
        lookup_map = { nMap : instanceNmap, vMap : instanceVmap },
        target_map = lookup_map[ symbol_key ],

        extend_key_list, extend_key_count, key_idx, extend_key
      ;

      if ( !target_map ) {
        return console.warn( '_symbol_map_key_not_supported_', symbol_key );
      }
      if ( vMap._typeofFn_( extend_map ) !== 'object' ) {
        return console.warn( '_merge_data_must_be_an_object_', extend_map );
      }

      extend_key_list  = vMap._makeKeyListFn_( extend_map );
      extend_key_count = extend_key_list[ vMap._length_ ];
      for ( key_idx = nMap._0_; key_idx < extend_key_count; key_idx++ ) {
        extend_key = extend_key_list[ key_idx ];
        if ( target_map[ vMap._hasOwnProperty_ ]( extend_key ) ) {
          console.warn(
            'Symbol expansion error.\n Will not override default value'
            + ' for |' + extend_key + '| in ' + symbol_key
          );
        }
        else {
          target_map[ extend_key ] = extend_map[ extend_key ];
        }
      }
      return target_map;
    }
    // . END public method /extendSymbolMapFn/

    instance_map = {
      _extendSymbolMapFn_ : extendSymbolMapFn,
      _aKey_ : aKey,
      _nMap_ : instanceNmap,
      _vMap_ : instanceVmap
    };

    if ( option_map._dont_autoadd_ !== vMap._true_ ) {
      global_obj = getGlobalObjFn();
      global_obj[ aKey ] = instance_map;
    }
    return instance_map;
  }
  // BEGIN public method /makeInstanceFn/

  // BEGIN public method /getFn/
  function getMapFn() {
    var mode_str = this;
    if ( mode_str === '_vMap_' ) { return vMap; }
    if ( mode_str === '_nMap_' ) { return nMap; }
  }
  // . END public method /getFn/

  // getMapFn gets the default nMap and vMap, not the instance values
  return {
    _getGlobalObjFn_ : getGlobalObjFn,
    _getNmap_        : getMapFn.bind( '_nMap_' ),
    _getVmap_        : getMapFn.bind( '_vMap_' ),
    _makeInstanceFn_ : makeInstanceFn
  };
  // == . END PUBLIC METHODS ===========================================
}());
// == . END MODULE xhi._00_root_ =======================================

// == BEGIN BROWSER AND NODE SUPPORT ===================================
/* istanbul ignore next */
try { module.exports = xhi; }
catch ( ignore ) { console.log(''); }
// == . END BROWSER AND NODE SUPPORT ===================================
