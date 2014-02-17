(function ( $ ) {

  var config = {
    'visible': true
  };

  $.fn.pages = function(options) {

    config = $.extend(config, options); 
    console.log(config);

  };

  $.fn.closePopup = function() {
      // Close popup code.
  };

}( jQuery ));