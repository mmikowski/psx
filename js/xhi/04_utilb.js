/*
 * 04_utilb.js
 * @author Michael S. Mikowski - mike.mikowski@gmail.com
 *
 * Use      : xhi._04_utilb_._makeInstanceFn_( app_map );
 * Synopsis : Add browser utility capabilities to app_map
 * Provides : Browser utilities
 * Requires : jQuery and aMap (app map) with symbols from
 *            00_root._makeInstanceFn_()
*/
/*global xhi, pcss */
// == BEGIN MODULE xhi._04_utilb_ =====================================
xhi._04_utilb_ = (function () {
  'use strict';
  function makeInstanceFn ( aMap, argOptionMap ) {
    // == BEGIN MODULE SCOPE VARIABLES ==================================
    var
      subName   = '_04_utilb_',
      nMap      = aMap._nMap_,
      vMap      = aMap._vMap_,

      cssKmap   = pcss._cfg_._cssKeyMap_,
      cssVmap   = pcss._cfg_._cssValMap_,

      __docRef  = window.document,
      __blank   = vMap._blank_,
      __false   = vMap._false_,
      __true    = vMap._true_,

      __0       = nMap._0_,

      // Add as needed __castBool, __castList, __castObj, __getVarType
      __util    = aMap._01_util_,
      __castJQ  = __util._castJQ_,
      __castFn  = __util._castFn_,
      __castInt = __util._castInt_,
      __castNum = __util._castNum_,
      __castMap = __util._castMap_,
      __castStr = __util._castStr_,

      configMap = {
        _textarea_min_ht_px_ : 30,
        _textarea_max_ht_px_ : 400
      },

      onBufferReady,
      instanceMap, optionMap
    ;
    // == . END MODULE SCOPE VARIABLES ==================================

    // == BEGIN UTILITY METHODS =========================================
    // == . END UTILITY METHODS =========================================

    // == BEGIN PUBLIC METHODS ==========================================
    // BEGIN Public method /decodeHtml/
    // Decodes HTML entities in a browser-friendly way
    // See http://stackoverflow.com/questions/1912501/\
    //   unescape-html-entities-in-javascript
    function decodeHtml ( arg_str ) {
      var str = __castStr( arg_str, __blank );
      return $( '<div></div>' )[ vMap._html_ ]( str )[ vMap._text_ ]();
    }

    // . END Public method /decodeHtml/

    // BEGIN Public method /fillForm/
    // Purpose: Fills a form by input names
    // Returns:
    //   * true - the form is valid and was processed.
    //   * false - the form was not valid.
    //
    function fillForm ( arg_$form, arg_map ) {
      var
        lookup_map = __castMap( arg_map, {} ),
        $form      = __castJQ( arg_$form )
      ;

      if ( !$form ) { return __false; }
      $.each( lookup_map, function ( k, v ) {
        var solve_str = __castStr( v );
        $form[ vMap._find_ ]( '[name=' + k + ']' ).each( function () {
          var
            $input      = $( this ),
            current_str = $input.val()
          ;

          if ( $input.is( 'input:radio' ) ) {
            $input.prop( 'checked', ( current_str === solve_str ) &&
              'checked' );
          }
          else if ( $input.is( 'input:checkbox' ) ) {
            $input.prop( 'checked', !!v );
          }
          else { $input.val( solve_str ); }
        } );
      } );
      return __true;
    }

    // . END Public method /fillForm/

    // BEGIN Public method /fixInputByType/
    function fixInputByType ( arg_$input ) {
      var
        $elem = __castJQ( arg_$input ),
        input_str, data_type, solve_data
      ;

      /* istanbul ignore next */
      if ( !$elem ) { return; }

      input_str = $elem[ vMap._val_ ]()[ vMap._trim_ ]();
      data_type = $elem[ vMap._attr_ ]( 'data-type' );

      switch ( data_type ) {
        case 'number':
          solve_data = __castNum( input_str, __0 );
          break;
        case 'integer':
          solve_data = __castInt( input_str, __0 );
          break;
        default:
          solve_data = __castStr( input_str, __blank );
          break;
      }
      return solve_data;
    }

    // . END Public method /fixInputByType/

    // BEGIN Public method /getFormMap/
    // Purpose: Create a map of form values key by input name
    // Example: form_map = getFormMap( $form );
    // Returns:
    //   * On success returns a map with name and key values.
    //     Use data-type="..." to cast returned values as numbers,
    //     integrers, or strings (see fixInputByType, above).
    //   * If arg_$form is invalid, returns undef.
    //
    function getFormMap ( arg_$form ) {
      var
        $form    = __castJQ( arg_$form ),
        form_map = {};

      if ( !$form ) { return; }

      $form[ vMap._find_ ]( 'input:not(:disabled)' )
        .each( function () {
          var
            $input     = $( this ),
            field_name = $input[ vMap._attr_ ]( 'name' )
          ;

          if ( !field_name ) { return; }
          if ( $input.is( 'input:checkbox' ) ) {
            form_map[ field_name ] = $input.is( ':checked' );
          }
          else if ( !$input.is( 'input:radio' ) || $input.is( ':checked' ) ) {
            form_map[ field_name ] = fixInputByType( $input );
          }
        } );

      $form[ vMap._find_ ]( 'select, textarea' )
        .each( function () {
          var
            $input               = $( this ),
            field_name           = $input[ vMap._attr_ ]( 'name' )
          ;
          form_map[ field_name ] = fixInputByType( $input );
        } );

      return form_map;
    }

    // . END Public method /getFormMap/

    // BEGIN Public method /onDomReady/
    // Purpose : Executes a provided function only after the browser DOM
    //           has been updated.
    // Example :
    //   onDomReady( loadImages );
    //
    // The Image object is not available in JSDOM, so we skip coverage
    // for this function.
    //
    /* istanbul ignore next */
    onBufferReady = (function () {
      var
        // 10 x 10px transparent png
        blankImgStr = __blank
          + 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAA'
          + 'CNMs+9AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3'
          + 'RJTUUH3woIAB8ceeNmxQAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUF'
          + 'eBDhcAAAAOSURBVBjTY2AYBYMTAAABmgABC6KdHwAAAABJRU5ErkJggg==',
        bodyEl
      ;

      function onBuf ( arg_fn ) {
        var
          callback_fn = __castFn( arg_fn ),
          img_el, s_obj;

        if ( !bodyEl ) {
          bodyEl = __docRef[ vMap._getElsByTagName_ ]( vMap._body_ )[ __0 ];
        }
        if ( !( callback_fn && bodyEl ) ) { return __false; }

        img_el = new Image();
        s_obj  = img_el[ vMap._style_ ];

        s_obj[ cssKmap._position_ ] = cssVmap._absolute_;
        s_obj[ cssKmap._left_ ]     = cssVmap._0_;
        s_obj[ cssKmap._top_ ]      = cssVmap._0_;
        s_obj[ cssKmap._width_ ]    = '1px';
        s_obj[ cssKmap._height_ ]   = '1px';

        img_el[ vMap._onload_ ] = function () {
          bodyEl[ vMap._removeChild_ ]( img_el );
          arg_fn();
        };
        bodyEl[ vMap._appendChild_ ]( img_el );
        img_el[ vMap._src_ ] = blankImgStr;
        return __true;
      }

      return onBuf;
    }());
    // . END Public method /onBufferReady/

    // BEGIN Public method /resizeTextarea/
    // Summary   : is_done = resizeTextarea( $textarea, 800 );
    // Purpose   : Adjust the size of a textarea to a maximum height
    //   to fit the text content
    // Arguments : (positional)
    //   0: (req) jQuery collection that is the text area
    //   1: (opt) The maximum allowed height in pixels
    // Settings  :
    //   * configMap._textarea_max_ht_px_ (default max allowed height)
    //   * configMap._textarea_min_ht_px_
    // Returns   : boolean
    //   * true  - resize request processed
    //   * false - not processed ( invalid $textarea )
    //
    function resizeTextarea ( arg_$textarea, arg_max_ht_px ) {
      var
        $textarea = __castJQ( arg_$textarea ),
        max_ht_px = __castInt( arg_max_ht_px,
          configMap._textarea_max_ht_px_ ),
        min_ht_px = configMap._textarea_min_ht_px_,

        scroll_ht_px, outer_ht_px, solve_ht_px
      ;

      if ( !$textarea ) { return __false; }

      scroll_ht_px = $textarea[ vMap._prop_ ]( vMap._scrollHeight_ );
      outer_ht_px  = $textarea[ vMap._outerHeight_ ]();

      if ( ( scroll_ht_px > outer_ht_px )
        || ( scroll_ht_px < outer_ht_px - 30 )
      ) { solve_ht_px = scroll_ht_px + 8; }
      else { return __true; }

      if ( solve_ht_px > max_ht_px ) { solve_ht_px = max_ht_px; }
      if ( solve_ht_px < min_ht_px ) { solve_ht_px = min_ht_px; }

      $textarea[ vMap._css_ ]( cssKmap._height_, solve_ht_px );
      return __true;
    }
    // . END Public method /resizeTextarea/

    instanceMap = {
      _decodeHtml_     : decodeHtml,
      _fillForm_       : fillForm,
      _getFormMap_     : getFormMap,
      _onBufferReady_  : onBufferReady,
      _resizeTextarea_ : resizeTextarea
    };

    optionMap = __util._castMap_( argOptionMap, {} );
    if ( optionMap._dont_autoadd_ !== __true ) {
      aMap[ subName ] = instanceMap;
    }

    return instanceMap;
    // == . END PUBLIC METHODS ========================================
  }

  return { _makeInstanceFn_ : makeInstanceFn };
}());
// == . END MODULE xhi._04_utilb_ =====================================
