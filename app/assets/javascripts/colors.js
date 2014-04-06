var book = {
  name:"Sample Book",
  pages:[
    {id: "kda", content:"<div> <h1>Study Colors</h1> <p>These are the primary colors</p> <table class=\"table\"> <tr> <th>Color</th> <th>Example</th> </tr> <tr> <td>Red</td> <td style=\"background-color:red;\"></td> </tr> <tr> <td>Green</td> <td style=\"background-color:green;\"></td> </tr> <tr> <td>Blue</td> <td style=\"background-color:blue;\"></td> </tr> </table> </div>"},
    {id: "kdb", content:"<div> <h1>Test Colors</h1> <p>Question: Click Blue.</p> <table class=\"table\"> <tr> <th>Color</th> <th>Example</th> </tr> <tr> <td>???</td> <td><div class=\"button leap-interactive\" style=\"background-color:red;\"><br/><br/><br/></div></td> </tr> <tr> <td>???</td> <td><div class=\"button leap-interactive\" style=\"background-color:green;\"><br/><br/><br/></div></td> </tr> <tr> <td>???</td> <td> <div class=\"button leap-interactive\" style=\"background-color:blue;\"><br/><br/><br/></div> </td> </tr> </table> </div>"}
  ]
};

var gestureHandler = {
  swipeRight : {
    "kdb": { action: function(){ console.log("Swiped right says the handler!!!"); } }
  },
  click : {
    "kdb": { selector: "#blue", action: function(e){ console.log("Clicked says the handler!!!"); } }
  }
};

var pages = new Pages({
  source: book,
  start: 1,
  handlers: gestureHandler,
  selector: '#page',
  log: true
});


