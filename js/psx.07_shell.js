/*global $, psx */
// == BEGIN MODULE psx._07_shell_ =====================================
psx._07_shell_ = (function () {
  // == BEGIN MODULE SCOPE VARIABLES ==================================
  'use strict';
  var
    aMap      = psx,
    aKey      = aMap._aKey_,

    nMap      = aMap._nMap_,
    vMap      = aMap._vMap_,

    __0       = nMap._0_,
    __1       = nMap._1_,
    __undef   = vMap._undef_,
    // __$sub    = $[ vMap._gevent_ ][ vMap._subscribe_ ],

    __util    = aMap._01_util_,
    __logObj  = __util._getLogObj_(),
    __logMsg  = __logObj._logMsg_,
    __p       = __util._makeReplaceFn_( '_p_', aKey ),

    configMap = {
      _main_html_  : __p(
        '<div class="{_p_}-_shell_box_">'
          + '<div class="{_p_}-_shell_action_">'
            + '<button class="{_p_}-_x_lh_">Save</button>'
            + '<button class="{_p_}-_x_lh_">Load Selected:</button>'
            + '<select class="{_p_}-_shell_action_select_ '
              + '{_p_}-_x_lh_"></select>'
            + '<button class="{_p_}-_x_rh_">color</button>'
            + '<button class="{_p_}-_x_rh_">help</button>'
          + '</div>'
          + '<div class="{_p_}-_shell_palette_"></div>'
          + '<div class="{_p_}-_shell_layout_"></div>'
        + '</div>'
      ),
      _image_html_ : __p(
        '<div class="{_p_}-_shell_palette_image_" '
          + 'style="background-image:{_image_url_}"></div>'
      ),
      _cell_html_ : __p(
        '<div class="{_p_}-_shell_layout_cell_"></div>'
      ),
      _image_list_ : [
        "bunnies-001.jpg",
        "bunnies-002.jpg",
        "bunnies-003.jpg",
        "bunnies-004.jpg",
        "bunnies-005.jpg",
        "bunnies-006.jpg",
        "bunnies-007.jpg",
        "bunnies-008.jpg",
        "bunnies-009.jpg",
        "bunnies-010.jpg"
      ]
    },
    stateMap  = {
      _$drag_proxy_  : __undef,
      _drag_top_px_  : __undef,
      _drag_left_px_ : __undef,

      _layout_cell_class_  : __p( '.{_p_}-_shell_layout_cell_'   ),
      _palette_img_class_  : __p( '.{_p_}-_shell_palette_image_' ),

      _theme_count_ : __undef,
      _theme_idx_   : __undef,

      _save_html_list_ : [],
      _save_name_list_ : [],

      _split_w_map_ : {
        width: '50%', height: '100%', float: 'left', margin : __0,
        borderRadius : 0
      },
      _split_h_map_ : {
        width: '100%', height: '50%', margin : __0, borderRadius : __0
      }
    },

    $Map
    ;
  // == . END MODULE SCOPE VARIABLES ==================================

  // == BEGIN UTILITY METHODS =========================================
  // == . END UTILITY METHODS =========================================

  // == BEGIN DOM METHODS =============================================
  // BEGIN DOM method /set$MapFn/
  function set$MapFn () {
    var
      $body     = $('body'),
      $box      = $body[   vMap._find_ ]( __p( '.{_p_}-_shell_box_'     ) ),
      $layout   = $body[   vMap._find_ ]( __p( '.{_p_}-_shell_layout_'  ) ),
      $palette  = $body[   vMap._find_ ]( __p( '.{_p_}-_shell_palette_' ) ),
      $action   = $body[   vMap._find_ ]( __p( '.{_p_}-_shell_action_'  ) ),
      $select   = $action[ vMap._find_ ](
        __p( '.{_p_}-_shell_action_select_' )
      );

    $Map = {
      _$body_    : $body,
      _$box_     : $box,
      _$layout_  : $layout,
      _$palette_ : $palette,
      _$action_  : $action,
      _$select_  : $select
    };
  }
  // . END DOM method /set$MapFn/

  // BEGIN DOM method /initPaletteFn/
  function initPaletteFn () {
    var
      image_list  = configMap._image_list_,
      image_count = image_list.length,
      solve_list = [],

      idx, image_name, image_url,
      image_html, solve_html
      ;

    for ( idx = __0; idx < image_count; idx++ ) {
      image_name = image_list[ idx ];
      image_url  = 'url(img/bunnies/' + image_name + ')';
      image_html = __util._makeTmpltStr_({
        _input_str_  : configMap._image_html_,
        _lookup_map_ : {
          _image_url_ : image_url
        }
      });
      solve_list.push( image_html );
    }
    solve_html = solve_list.join(vMap._blank_);
    $Map._$palette_[ vMap._html_ ]( solve_html );

    $Map._$palette_images_ = $Map._$palette_[ vMap._find_ ](
      stateMap._palette_img_class_
    );
  }
  // . END DOM method /initPaletteFn/
  
  // BEGIN DOM method /initLayoutFn/
  function initLayoutFn () {
    var solve_list = [], idx, solve_html;
    for ( idx = __0; idx < 4; idx++ ) {
      solve_list.push( configMap._cell_html_ );
    }
    solve_html = solve_list.join(vMap._blank_);
    $Map._$layout_[ vMap._html_ ]( solve_html );
    $Map._$layout_cells_ = $Map._$layout_[ vMap._find_ ](
      stateMap._layout_cell_class_
    );
  }
  // . END DOM method /loadLayoutFn/

  // BEGIN DOM method /showHelpFn/
  function showHelpFn () {
    aMap._06_lb_._showLbFn_( {
      _title_html_   : 'Help on Layout',
      _content_html_ :
        '<p>Use a mouse or finger to drag and drop images from '
        + 'the "<b>palette</b>" area on the left to the "<b>layout</b>" '
        + 'section on the right and into a "<b>cell</b>".</p>'

        + '<p>Change any background image '
        + 'at any time by dragging over a replacement.</p>'

        + '<p>Save the layout at any time by tapping on the '
        + '"<b>Save</b>" button, and retrieve a saved layout by '
        + 'selecting a saved number and then tapping on the '
        + '"<b>Load Selected:</b>" button. The "0" index is '
        + 'always empty.</p>'

        + '<p>Tap on a layout cell to split it horizontally. Long-tap '
        + 'on a layout cell to split it vertically.</p>'

        + '<p>Tap on "<b>Color</b> to cycle the color theme. '
        + 'Tap on the "<b>help</b>" button at any' +
        ' time '
        + 'to see this message again.</p>'

    });
  }
  // . END DOM method /showHelpFn/

  // BEGIN DOM method /cycleColorFn/
  function cycleColorFn () {
    stateMap._theme_idx_++;
    if ( stateMap._theme_idx_ >= stateMap._theme_count_ ) {
      stateMap._theme_idx_ = __0;
    }
    psx._06_css_._setPaletteIdx_( stateMap._theme_idx_ );
  }
  // .END DOM method /cycleColorFn/
  // == . END DOM METHODS =============================================

  // == BEGIN EVENT HANDLERS ==========================================
  // BEGIN browser-event handlers
  function onDragstartFn ( event_obj ) {
    var
      $target = $( event_obj.orig_target ),
      $found  = $target.closest( stateMap._palette_img_class_ ),
      $drag_proxy, offset_map
      ;
    if ( $found[ vMap._length_ ] === __0 ) { return; }
    $drag_proxy = $found.clone();
    offset_map = $found.offset();

    $drag_proxy.css({
      border : '2px solid white',
      width  : $found.width(),
      height : $found.height(),
      top    : offset_map.top,
      left   : offset_map.left,
      z_index: 25
    });

    $Map._$box_.append( $drag_proxy );
    stateMap._$drag_proxy_  = $drag_proxy;
    stateMap._drag_left_px_ = offset_map.left;
    stateMap._drag_top_px_  = offset_map.top;
  }

  function onDragmoveFn ( event_obj ) {
    var
      $drag_proxy  = stateMap._$drag_proxy_
      ;

    if ( ! $drag_proxy ) { return; }
    stateMap._drag_left_px_ += event_obj.px_delta_x;
    stateMap._drag_top_px_  += event_obj.px_delta_y;

    $drag_proxy.css({
      left : stateMap._drag_left_px_,
      top  : stateMap._drag_top_px_
    });
  }

  function onDragendFn ( event_obj ) {
    var
      $drag_proxy = stateMap._$drag_proxy_,
      background_url
      ;

    if ( ! $drag_proxy ) { return; }
    background_url = $drag_proxy.css( 'backgroundImage' );

    // TODO animate to container target
    $drag_proxy[ vMap._fadeOut_ ](function () {
      var found_el, $layout_cell;
      $drag_proxy.remove();
      found_el = document.elementFromPoint(
        event_obj.px_current_x,
        event_obj.px_current_y
      );
      $layout_cell = $( found_el )
        .closest( stateMap._layout_cell_class_ );
      if ( $layout_cell.length === 1 ) {
        $layout_cell.css( 'backgroundImage', background_url );
      }
    });
    stateMap._drag_left_px_ = __undef;
    stateMap._drag_top_px_  = __undef;
  }

  // Called by onTapHeldFn
  function onTapLoadFn ( /*event_obj*/ ) {
    var
      save_html_list = stateMap._save_html_list_,
      layout_idx     = $Map._$select_[ vMap._val_ ](),
      solve_html     = save_html_list[ layout_idx ]
      ;

    $Map._$layout_[ vMap._html_ ]( solve_html );
  }
  // Called by onTapHeldFn, and during init
  function onTapSaveFn ( /*event_obj*/ ) {
    var
      save_html_list = stateMap._save_html_list_,
      save_name_list = stateMap._save_name_list_,
      option_html
      ;

    if ( save_html_list[ vMap._length_ ] > 10 ) {
      save_html_list = save_html_list[ vMap._slice_ ]( __1 );
      save_name_list = save_name_list[ vMap._slice_ ]( __1 );
    }
    save_html_list[ vMap._push_ ]( $Map._$layout_[ vMap._html_]() );
    save_name_list[ vMap._push_ ]( save_name_list[ vMap._length_ ] );

    option_html = __util._makeOptionHtml_({
      _val_list_    : save_name_list,
      _select_list_ : [ save_name_list[ vMap._length_ ] - __1 ]
    });
    $Map._$select_[ vMap._html_]( option_html );
  }

  function onTapHeldFn ( event_obj ) {
    var 
      $target      = $( event_obj.orig_target ),
      $layout_cell = $target.closest( 
        stateMap._layout_cell_class_
      ),

      button_label,
      $clone1, $clone2, css_split_map
      ;

    if ( $target.is( 'button' ) ) {
      button_label = $target.text();
      switch( button_label ) {
        case 'Save':
          return onTapSaveFn( event_obj );
        case 'help':
          return showHelpFn();
        case 'color':
          return cycleColorFn();
        default:
          return onTapLoadFn( event_obj );
      }
    }

    if ( $layout_cell.length !== __1 ) { return; }

    css_split_map = ( event_obj.type === 'uheld' )
      ? stateMap._split_h_map_ : stateMap._split_w_map_
      ;

    $clone1 = $layout_cell.clone();
    $clone1[ vMap._css_ ]( css_split_map );
    $clone2 = $clone1[ vMap._clone_ ]();

    $clone2[ vMap._css_ ]( 'backgroundImage', vMap._blank_);
    $layout_cell[ vMap._css_ ]( 'backgroundImage', vMap._blank_ );
    $layout_cell[ vMap._append_ ]( $clone1, $clone2 );
  }
  // . END browser-event handlers
 
  // BEGIN model-event handlers
  // . END model-event handlers
  // == . END EVENT HANDLERS ==========================================

  // == BEGIN PUBLIC METHODS ==========================================
  // BEGIN public method /initModuleFn/
  function initModuleFn () {
    var $body = $('body');
    // Init styling and set up screen
    aMap._06_css_._initModuleFn_();
    $body[ vMap._html_ ](
      __util._makeTmpltStr_({
        _input_str_ : configMap._main_html_,
        _lookup_map_ : {
        }
      }
    ));
    stateMap._theme_count_ = aMap._06_css_._getPaletteCount_();
    stateMap._theme_idx_   = __0;

    // Init jQuery Cache, Palette, and Layout
    set$MapFn();
    initPaletteFn();
    initLayoutFn();

    // Set browser event bindings
    $Map._$box_[
      vMap._on_ ]( 'udragstart', onDragstartFn )[
      vMap._on_ ]( 'udragmove',  onDragmoveFn  )[
      vMap._on_ ]( 'udragend',   onDragendFn   )[
      vMap._on_ ]( 'uheld',      onTapHeldFn   )[
      vMap._on_ ]( 'utap',       onTapHeldFn   )
      ;

    // Init select and help
    onTapSaveFn();
    showHelpFn();
    __logMsg( '_info_', '_07_shell_init_complete_')
  }
  // . END public method /initModuleFn/
  return { _initModuleFn_ : initModuleFn };
  // == . END PUBLIC METHODS ==========================================
}());
// == . END MODULE psx._07_shell_ =====================================
