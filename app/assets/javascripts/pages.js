function Pages( options ) {

  var LEFT=37, UP=38, RIGHT=39, DOWN=40;

  // Defaults
  var config = {
      visible : true,
      source : false,
      selector : false,
      handlers: false,
      start: 0,
      log : false
    }, 
    currPage = false,
    selector = false,
    pageData = '',
    pageNum = 0;


  var pausedFrame = null;
  var latestFrame = null;
  

  

  var beforeRender = function(){
    var handlers = config.handlers;
    // Check to see if there are any swipe events
    if(handlers && (handlers.swipeLeft || handlers.swipeRight)){
      // Fire handler if custom handler includes current page
      if((currPage.id in handlers.swipeLeft) || (currPage.id in handlers.swipeRight))
        handlers.swipeLeft[currPage.id].action();
    }
  }

  var afterRender = function(){
    var handlers = config.handlers;

    // If there are any click handlers defined
    if(handlers && handlers.click){
      // If current page has a click handler defined
      if(currPage.id in handlers.click){
        // If current page has 1+ click handlers defined
        if (handlers.click[currPage.id] instanceof Array) {
          // For each click handler, assign click listener and custom action
          $.each( handlers.click[currPage.id], function( index, handler ) {
            $(document.body).on("click", handler.selector, handler.action);
          });
        }
      }
    }
  }


  // Move the Previous Page
  var prevPage = function(){
    if($('#blockInput').length) return false;

    if(pageNum > 0) pageNum--;
    render();
  };

  // Move the Next Page
  var nextPage = function(){
    if($('#blockInput').length) return false;

    if(pageData.pages.length){
      
      beforeRender()

      if(pageNum < pageData.pages.length-1) pageNum++;
      
      render();
    }
  };


  var blockInput = function(time){
    // Create hidden field
    $('<input>').attr({type: 'hidden',id: 'blockInput',name: 'blockInput'}).appendTo(selector);
    // Delete hidden field after N time
    setTimeout(function(){ $('#blockInput').remove() }, time);
  }

  // Render the current Page
  var render = function(){
    currPage = pageData.pages[pageNum];

    // Grab page content
    content = pageData.pages[pageNum].content
    // Insert page into the current selector
    selector.html(content);

    // Update Page Number
    $('#page_number').html('Page <b>'+(pageNum+1)+'</b> of '+pageData.pages.length);

    // Invoke any AferRender Handlers
    afterRender();

    // Prevent any new input for 1 second
    blockInput(1000);
  };


  // Capture LEAP Motion Pause/Play
  window.onkeypress = function(e) {
    if (e.charCode == 32) {
      if (pausedFrame == null) {
        // Allow LEAP Motion input
        pausedFrame = latestFrame;
      } else {
        // Pause LEAP Motion input
        pausedFrame = null;
      }
    }
  };

  // Observe Page right/left key entry
  var observeKeypress = function(){
    $(document).on('keyup', function(e){
      if (e.keyCode == RIGHT) { 
        nextPage();
        return false;
      }
      if (e.keyCode == LEFT) { 
        prevPage();
        return false;
      }
    });
  };


  // Capture LEAP Motion input
  var handleGestures = function (gesture){

    // Swipe gesture
    if (gesture.type == "swipe") {;
        if(gesture.direction[0] > 0){
          // Swipe Left
          prevPage();
        } else {
          // Swipe Right
          nextPage();
        }
    }
  };


  // Main/Entry Function
  var init = function() {

    // Overwrite defaults with any user-defined options
    config = $.extend(config, options); 
        
    // Validate there is a selector and book
    if(!config.selector)
      throw "Selector not defined";
    if(!config.source)
      throw "Book not defined";

    // Handle custom start page
    if(config.start != 0)
      pageNum = config.start


    // Assign the book
    pageData = config.source;
    // Assign the book render location
    selector = $(config.selector);


    // Start observing key presses
    observeKeypress();


    // Render out the current page
    render();

    // Start the Leap JS library
    LeapManager.init({
      maxCursors:1,
      enableHoverTap: true,
      enableDefaultMetaGestureActions: false,
      gestureCallback:function(e){
        handleGestures(e);
      }
    });

    return this;    
  };


  // Start Pages
  return init();

}


// Global timeouts
Pages.timeouts = {}

// Pages Modal
Pages.modal = function(message) {
  $('#message').html(message);
  $('.modal').modal('show');
}

// Pages Alert
Pages.alert = function(status, message, time){

  var time = typeof time !== 'undefined' ? a : 5000;

  $('#alerts').html('<div class="alert alert-message alert-'+status+'">'+message+' <a class="close" data-dismiss="alert">×</a></div>');
  $('.alert').animate({top: 10}, 500);

  if('alert' in Pages.timeouts) clearTimeout(Pages.timeouts['alert']);

  Pages.timeouts['alert'] = setTimeout(function() {
      $('.alert').fadeOut('fast');
  }, time);
};
