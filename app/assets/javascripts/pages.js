function Pages( options ) {

  var LEFT=37, UP=38, RIGHT=39, DOWN=40;
  
  var config = {
      visible : true,
      source : false,
      selector : false,
      log : false
    }, 
    currPage = false,
    selector = false,
    pageData = '',
    pageNum = 0;


  var pausedFrame = null;
  var latestFrame = null;
  var controller = new Leap.Controller({enableGestures: true});
  
  var prevPage = function(){
    if($('#blockInput').length) return false;

    if(pageNum > 0) pageNum--;
    console.log("Rendered page " + currPage.id);
    render();
  };

  var nextPage = function(){
    if($('#blockInput').length) return false;

    if(pageData.pages.length){
      if(pageNum < pageData.pages.length-1) pageNum++;
      console.log("Rendered page " + currPage.id);
      render();
    }
  };

  var observeKeypress = function(){
    $(document).on('keyup', function(e){
      if (e.keyCode == RIGHT) { 
        nextPage();
        console.log("RIGHT");
        return false;
      }
      if (e.keyCode == LEFT) { 
        console.log("LEFT");
        prevPage();
        return false;
      }
    });
  };

  var blockInput = function(time){
    // Create hidden field
    $('<input>').attr({type: 'hidden',id: 'blockInput',name: 'blockInput'}).appendTo(selector);
    // Delete hidden field after N time
    setTimeout(function(){ $('#blockInput').remove() }, time);
  }

  var render = function(){
    // console.log("===========");
    // console.log(pageData);
    // console.log(pageNum);
    // console.log(pageData.pages[pageNum].content);

    currPage = pageData.pages[pageNum];

    content = pageData.pages[pageNum].content
    selector.html(content);
    $('<h4>').attr({id: 'page_number'}).appendTo(selector);
    $('#page_number').html(pageNum);


    blockInput(1000);
  };


  window.onkeypress = function(e) {
    if (e.charCode == 32) {
      if (pausedFrame == null) {
        pausedFrame = latestFrame;
      } else {
        pausedFrame = null;
      }
    }
  };

  var handleGestures = function (gestures){

    $.each(gestures, function( index, gesture ) {

      if (gesture.type == "swipe") {;
        //Classify swipe as either horizontal or vertical
        var isHorizontal = Math.abs(gesture.direction[0]) > Math.abs(gesture.direction[1]);
        //Classify as right-left or up-down
        if(isHorizontal){
          if(gesture.direction[0] > 0){
            swipeDirection = "right";
            prevPage();
          } else {
            swipeDirection = "left";
            nextPage();
          }
        }
      }

    });
  };

  var init = function() {

    config = $.extend(config, options); 
        
    if(!config.selector)
      throw "Selector not defined";
    if(!config.source)
      throw "Book not defined";


    selector = $(config.selector);
    observeKeypress();
    pageData = config.source;
    render();
    console.log(pageData);

    controller.loop(function(frame) {
      latestFrame = frame;

      if(config.log)
        document.getElementById('out').innerHTML = (pausedFrame ? "<p><b>PAUSED</b></p>" : "") + "<div>"+(pausedFrame || latestFrame).dump()+"</div>";

      if(latestFrame.gestures.length){
        handleGestures(latestFrame.gestures);
      }

    });

    return this;    
  };


  return init();

}
