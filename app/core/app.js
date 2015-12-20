;(function(G){
var app = module.exports = {};
app.service = require("./service.js");

["config", "timer", "slots", "editroid"].forEach( function(name){
    app.service.get(name)
})

})(this);