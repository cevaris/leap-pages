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

### Click Page Handlers

The following defines a book with the `click` page handlers. We define three click events for the same page. In order for LEAP pages to capture the click event, we need to define the clickable HTML element with the class selector `leap-interactive`. In the following example, we did this for page `aaa`. Notice in `gestureHandler` we also define a click page handler for page `aaa`. A click page handler consists of a `selector` which maps the `action` to a function. In this example, we invoke a `Pages.alert()` modal when the click able element `.red` is clicked. The following also shows how to define multiple click events in the same HTML page; one for red, blue, and green.

```
  var book = {
    name:"Sample Book",
    pages:[
      {id: "aaa", content:"<div class=\"button leap-interactive red\"> ... "},
      ...
      {id: "nn", content:"<p>Hello world, Page 1</p>"},
    ]
  };
  
  var gestureHandler = {
    click : {
    "aaa": [{ 
      	selector: ".red", 
      	action: function(e){ Pages.alert('danger', "Nope, wrong color"); } 
      },{ 
      	selector: ".green", 
      	action: function(e){ Pages.alert('danger', "Close, try again!"); } 
      },{ 
      	selector: ".blue", 
      	action: function(e){ Pages.alert('success',"You got it!!"); } 
     }]
    }
  };

  var pages = new Pages({
    source: book,
    handlers: gestureHandler,
    selector: '#page'
  });
  
```

### Swipe Page Handlers

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

## Pages Options
There are multiple **optional** parameters that the `Pages` constructer takes. 

* `source`: Define a book with list of HTML `pages` and `name`.
* `handlers`: Define dictionary of handlers.
* `selector`: Define the HTML `div` element the book should render into.
* `start`: Define the starting page the book should default to. Default: 0.
* `log`: Define weather to log the LEAP Motion dump or not. Default: true.





## License
The MIT License (MIT)

Copyright (c) [2014] [cevaris]

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.







  







