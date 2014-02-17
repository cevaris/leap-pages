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

  render = function(){
    // console.log(pageData);
    console.log(pageNum);
    console.log(pageData.pages[pageNum].content);
    selector.html(pageData.pages[pageNum].content);
  };

  prevPage = function(){
    if(pageNum > 0) pageNum--;
    render();
  };

  nextPage = function(){
    if(pageData.pages.length){
      if(pageNum < pageData.pages.length) pageNum++;
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