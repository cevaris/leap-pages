(function ( $ ) {

  var config = {
    'visible': true,
    'sourceUrl': false}, 
  pageData = '',
  pageNum = 0,
  selector = undefined;

  var LEFT=37, UP=38, RIGHT=39, DOWN=40;


  $.fn.pages = function(options) {

    config = $.extend(config, options); 
    console.log(config);

    selector = this;
    init();

  };

  pageNumber = function(){
    return pageNum;
  }

  observeKeypress = function(){
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

  blockInput = function(time){
    // Create hidden field
    $('<input>').attr({type: 'hidden',id: 'blockInput',name: 'blockInput'}).appendTo(selector);
    // Delete hidden field after N time
    setTimeout(function(){ $('#blockInput').remove() }, time);
  }

  render = function(){
    // console.log(pageData);
    // console.log(pageNum);
    // console.log(pageData.pages[pageNum].content);

    selector.html(pageData.pages[pageNum].content);
    blockInput(1000);
  };

  $.fn.prevPage = function(){
    if($('#blockInput').length) return false;

    if(pageNum > 0) pageNum--;
    render();
  };

  $.fn.nextPage = function(){
    if($('#blockInput').length) return false;

    if(pageData.pages.length){
      if(pageNum < pageData.pages.length-1) pageNum++;
      render();
    }
  };

  fetch = function(sourceUrl) {
    $.getJSON(sourceUrl, function(json){
      pageData = json;
      render();
    });
  };

  init = function() {
    observeKeypress();

    if(config.sourceUrl) {
      fetch(config.sourceUrl);
    }
  };

}( jQuery ));