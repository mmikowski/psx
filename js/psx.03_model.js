/*
 * psx.03_model.js
 * @author Michael S. Mikowski - mike.mikowski@gmail.com
 *
 * PredictSpring model component
*/
/*global $, psx*/
// == BEGIN MODULE psx._03_model_ ======================================
psx._03_model_ = (function () {
  // == BEGIN MODULE SCOPE VARIABLES ===================================
  'use strict';
  var
    aMap = psx,
    aKey = aMap._aKey_,
    nMap = aMap._nMap_,
    vMap = aMap._vMap_,
    __$publishFn  = $[ vMap._gevent_ ][ vMap._publish_],

    configMap = {},
    stateMap  = {}
    ;
  // == . END MODULE SCOPE VARIABLES ===================================

  // == BEGIN UTILITY METHODS ==========================================
  // == . END UTILITY METHODS ==========================================

  // == BEGIN PUBLIC METHODS ===========================================
  // BEGIN public method /initModuleFn/
  function initModuleFn () {
    __$publishFn( '_acknowledge_init_' );
  }
  // . END public method /initModuleFn/

  return {
    _initModuleFn_ : initModuleFn
  };
  // == . END PUBLIC METHODS ===========================================
}());
// == . END MODULE psx._03_model_ ======================================
