(function ( $ ) {

  var config = {
    'visible': true,
    'sourceUrl': false}, 
  pageData = '',
  pageNum = 0,
  selector = undefined;


  $.fn.pages = function(options) {

    config = $.extend(config, options); 
    console.log(config);

    selector = this;
    init();

  };

  render = function(){
    // console.log(pageData);
    // console.log(pageNum);
    // console.log(pageData.pages[pageNum].content);
    selector.html(pageData.pages[pageNum].content);
  }

  prevPage = function(){
    if(pageNum > 0) pageNum--;
    render();
  }

  nextPage = function(){
    if(pageData.pages.size){
      if(pageNum < pageData.pages.size) pageNum++;
      render();
    }
  }

  fetch = function(sourceUrl) {
    $.getJSON(sourceUrl, function(json){
      pageData = json;
      render();
    });
  }

  init = function() {
    if(config.sourceUrl) {
      fetch(config.sourceUrl);
    }

    
  };

}( jQuery ));