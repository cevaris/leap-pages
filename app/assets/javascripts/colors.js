var book = {
  name:"Sample Book",
  pages:[
    {id: "kda", content:"<div> <h1>Study Colors</h1> <p>These are the primary colors</p> <table class=\"table\"> <tr> <th>Color</th> <th>Example</th> </tr> <tr> <td>Red</td> <td style=\"background-color:red;\"></td> </tr> <tr> <td>Green</td> <td style=\"background-color:green;\"></td> </tr> <tr> <td>Blue</td> <td style=\"background-color:blue;\"></td> </tr> </table> </div>"},
    {id: "kdb", content:"<div> <h1>Test Colors</h1> <p>Question: Click Blue.</p> <table class=\"table\"> <tr> <th>Color</th> <th>Example</th> </tr> <tr> <td>???</td> <td><div class=\"button leap-interactive\" id=\"red\" style=\"background-color:red;\"><br/><br/><br/></div></td> </tr> <tr> <td>???</td> <td><div class=\"button leap-interactive\" id=\"green\" style=\"background-color:green;\"><br/><br/><br/></div></td> </tr> <tr> <td>???</td> <td> <div class=\"button leap-interactive\" id=\"blue\" style=\"background-color:blue;\"><br/><br/><br/></div> </td> </tr> </table> </div>"}
  ]
};

var gestureHandler = {
  swipeLeft : {
    "kda": { action: function(){ alert("Done studying? We are going to test you now, so be sure!!") } }
  },
  click : {
    "kdb": [
      { selector: "#red", action: function(e){ alert("Nope, wrong color"); } },
      { selector: "#green", action: function(e){ alert("Close, try again!"); } },
      { selector: "#blue", action: function(e){ alert("You got it!!"); } }
    ]
  }
};

var pages = new Pages({
  source: book,
  // start: 1,
  handlers: gestureHandler,
  selector: '#page',
  // log: true
});
