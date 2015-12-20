;(function(G){
   var app = require("../../core/app")
   var editroid = require("../editroid")
   var emitter  = require("event").eventEmitter;
   var util     = require("util")
   module.exports = function(){
     emitter.call(this);
     this.buffers    = new Set();
     this.cursor     = new editroid.cursor();
     this.selection  = new editroid.selection();
   }
   util.inherits(module.exports, emitter);
})(this);