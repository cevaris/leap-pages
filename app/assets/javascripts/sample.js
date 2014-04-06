var book = {
  name:"Sample Book",
  pages:[
    {id: "kda", content:"<div><p>Augue pid, amet, porttitor dis sagittis? Lorem porta quis ac adipiscing augue, sagittis. Elementum lundium! Odio? Rhoncus. Duis dolor auctor tristique sed nec rhoncus lundium natoque, cum ultrices tortor odio enim mauris dis? Turpis a dictumst massa nisi et ac porta amet sed sed aliquam aenean et, cras urna purus.</p></div>"},
    {id: "kdb", content:"<div><p>Vel! Dis non aenean rhoncus ac aliquam vel etiam, auctor sed porta turpis velit placerat in magnis tincidunt a amet montes, ac sed et, et! Vel adipiscing. In augue dignissim? Eros lorem tincidunt, egestas turpis, velit adipiscing est massa, rhoncus. Et tincidunt auctor porttitor porta! Pellentesque aenean a dis.</p></div>"},
    {id: "kdc", content:"<div><p>Nec. In magna scelerisque et quis in et montes, in vut, tincidunt velit? Parturient montes amet augue adipiscing quis rhoncus, adipiscing ac augue adipiscing sagittis. Magnis integer nec nascetur urna lacus, ac, porta ac dictumst ac dolor vel turpis? Nunc amet scelerisque cras ultricies velit! Rhoncus amet scelerisque ac.</p></div>"},
    {id: "kdd", content:"<div><p>Platea magna? Sagittis vel odio et facilisis, magna, sociis ac nisi, integer risus, pulvinar mus, urna arcu, lectus, natoque ridiculus sit ridiculus tempor dolor augue, turpis! Adipiscing lectus et! Placerat a, duis, nunc, turpis augue sed mattis mid, ultrices? Magnis. In facilisis tincidunt a, porta? Purus augue nascetur parturient.</p></div>"},
    {id: "kde", content:"<div><p>Odio nec dapibus lundium ut mid amet! Amet ac, ac sagittis eu diam diam in. Proin placerat auctor. Lundium, egestas sed, duis urna. Elit, in ut pulvinar non amet auctor adipiscing adipiscing dignissim est turpis aliquet hac facilisis scelerisque? Augue vut et? Vut cursus integer non egestas? Dis, sociis.</p></div>"}
  ]
};

var gestureHandler = {
  swipeLeft : {
    "hdb": { func: function(){ console.log("Swiped left says the handler!!!") } },
    "kdd": { func: function(){ console.log("Swiped left says the handler!!!") } }, 
  },
  swipeRight : {
    "hdd": { func: function(){ console.log("Swiped right says the handler!!!"); } }
  }
};
console.log(gestureHandler);


var pages = new Pages({
  source: book,
  handler: gestureHandler,
  selector: '#page'
  // log: true
});
