# Leap Pages - Interactive Reader
This is a Rails application using a custom defined Javascript framework to create/interact with HTML5 books. 

## Getting Started
You need

*	SQLite
*	Ruby
*	Git

Clone project (feel free to fork)  

	git clone https://github.com/cevaris/leap-pages.git

Setup up the code
	
	# If needed, install bundler
	gem install bundler
	
	# Install dependencies and setup database
	bundle install
	rake db:create
	
	# Start server
	rails s
	

Now open your browser (http://localhost:3000/)[http://localhost:3000/]. Make sure you have your [LEAP motion device](https://www.leapmotion.com/) plugged into your laptop.

In the `pages` drop-own in the nav-bar, notice there are three books. Navigate to one of them to try them out....

* [Sample Book](http://localhost:3000/pages/sample)
* [Colors Book](http://localhost:3000/pages/colors)
* [Add/Subtraction Book](http://localhost:3000/pages/add_sub)


## How to create a book
Books are simple to make. As simple as creating an HTML web page. A book is defined using JSON. HTML pages are stored into as JSON array. Page Handlers, or interactions, are defined into a nested structure as well. Page handlers allow the author to define custom Javascript for either swipe or click events.

### Sample book

Here we define a sample book with no page handlers. Notice, there are three pages. Each page is defined in `book.pages` array. Each page must have a unique `id`. This page id can be any string, for example a [UUID](http://www.famkruithof.net/uuid/uuidgen), `1`, `123`, `abc`, etc. Each page also has a `content` field, where the actual HTML page goes. Lastly, we pass in the `book` variable into the `source` options in the `Pages` constructor. 

```
  var book = {
    name:"Sample Book",
    pages:[
      {id: "aaa", content:"<p>Hello world, Page 1</p>"},
      {id: "aab", content:"<p>Hello world, Page 2</p>"},
      {id: "aac", content:"<p>Hello world, Page 3</p>"}
    ]
  };

  var pages = new Pages({
    source: book,
    selector: '#page'
  });
  
```

### Swipe Event

The following defines a book with the `swipeLeft` and `swipeRight` page handlers. We define our page handlers. We store the page handlers into the local variable `gestureHandler`. The page handlers are defined as a dictionary of handlers, where each handler is dictionary that maps to a dictionary of pages, which holds 1-to-Many custom handlers. For example, here we define an event to capture a `swipeRight` motion occurring on the last page `acc`, and print to console. Lastly, after defining the page handlers in `gestureHandler`, we pass `gestureHandler` into the `Pages` constructor using the `handlers` option. 

```
  var book = {
    name:"Sample Book",
    pages:[
      {id: "aaa", content:"<p>Hello world, Page 1</p>"},
      {id: "aab", content:"<p>Hello world, Page 2</p>"},
      {id: "aac", content:"<p>Hello world, Page 3</p>"}
    ]
  };
  
  var gestureHandler = {
    swipeLeft : {
      "aaa": { action: function(){ console.log("Next page") } },
      "aab": { action: function(){ console.log("Swiped left!!") } }, 
    },
    swipeRight : {
      "aac": { action: function(){ console.log("End of book!"); } }
    }
  };

  var pages = new Pages({
    source: book,
    handlers: gestureHandler,
    selector: '#page'
  });
  
```






  







