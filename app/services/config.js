;(function(G){
  var configFile = function(configFile){
     this.configFile = configFile;
     this.object     = null;
  }
  var fs = require("fs")
  configFile.prototype = Object.create({
     "load": function(){
        this.object = JSON.parse(fs.readFileSync(this.configFile));
     },
     "save": function(){
         fs.writeFileSync(this.configFile, JSON.stringify(this.object));
     },
     "get": function(){
         return this.object;
     },
     "set": function(obj){
         this.object = obj;
     },
  });	
  var service_ = module.exports = {
    "file": function(name){return new configFile(name)}
  }
})(this)