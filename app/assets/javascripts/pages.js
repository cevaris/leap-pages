function Pages( options ) {

  var LEFT=37, UP=38, RIGHT=39, DOWN=40;
  var config = {
    'visible': true,
    'sourceUrl': false
    }, 
    pageData = '',
    pageNum = 0,
    selector = undefined;

  var settings = $.extend({
    container: "body",
    data: {}
  }, options );

  this.init = function(options) {

    config = $.extend(config, options); 
    console.log(config);

    selector = this;
    observeKeypress();

    if(config.sourceUrl) {
      fetch(config.sourceUrl);
    }

  };

  this.prevPage = function(){
    if($('#blockInput').length) return false;

    if(pageNum > 0) pageNum--;
    render();
  };

  this.nextPage = function(){
    if($('#blockInput').length) return false;

    if(pageData.pages.length){
      if(pageNum < pageData.pages.length-1) pageNum++;
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
    // console.log(pageData);
    // console.log(pageNum);
    // console.log(pageData.pages[pageNum].content);

    content = pageData.pages[pageNum].content
    selector.html(content);
    $('<h4>').attr({id: 'page_number'}).appendTo(selector);
    $('#page_number').html(pageNum);


    blockInput(1000);
  };

  

  var fetch = function(sourceUrl) {
    $.getJSON(sourceUrl, function(json){
      pageData = json;
      render();
    });
  };

}




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

    content = pageData.pages[pageNum].content
    selector.html(content);
    $('<h4>').attr({id: 'page_number'}).appendTo(selector);
    $('#page_number').html(pageNum);


    blockInput(1000);
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







// (function ( $ ) {

//   var config = {
//     'visible': true,
//     'sourceUrl': false}, 
//     pageData = '',
//     pageNum = 0,
//     selector = undefined;

//   var LEFT=37, UP=38, RIGHT=39, DOWN=40;


//   $.fn.pages = function(options) {

//     config = $.extend(config, options); 
//     console.log(config);

//     selector = this;
//     init();

//   };

//   $.fn.prevPage = function(){
//     if($('#blockInput').length) return false;

//     if(pageNum > 0) pageNum--;
//     render();
//   };

//   $.fn.nextPage = function(){
//     if($('#blockInput').length) return false;

//     if(pageData.pages.length){
//       if(pageNum < pageData.pages.length-1) pageNum++;
//       render();
//     }
//   };

//   observeKeypress = function(){
//     $(document).on('keyup', function(e){
//       if (e.keyCode == RIGHT) { 
//         nextPage();
//         console.log("RIGHT");
//         return false;
//       }
//       if (e.keyCode == LEFT) { 
//         console.log("LEFT");
//         prevPage();
//         return false;
//       }
//     });
//   };

//   blockInput = function(time){
//     // Create hidden field
//     $('<input>').attr({type: 'hidden',id: 'blockInput',name: 'blockInput'}).appendTo(selector);
//     // Delete hidden field after N time
//     setTimeout(function(){ $('#blockInput').remove() }, time);
//   }

//   render = function(){
//     // console.log(pageData);
//     // console.log(pageNum);
//     // console.log(pageData.pages[pageNum].content);

//     content = pageData.pages[pageNum].content
//     selector.html(content);
//     $('<h4>').attr({id: 'page_number'}).appendTo(selector);
//     $('#page_number').html(pageNum);


//     blockInput(1000);
//   };

  

//   fetch = function(sourceUrl) {
//     $.getJSON(sourceUrl, function(json){
//       pageData = json;
//       render();
//     });
//   };

//   init = function() {
//     observeKeypress();

//     if(config.sourceUrl) {
//       fetch(config.sourceUrl);
//     }
//   };

// }( jQuery ));