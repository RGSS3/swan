;(function(G){
   var Components = module.exports = function(name, obj){
      this.name = name
      this.obj  = obj
   };
   Components._collections = new Map();
   Components.get = function(name){
          if(this._collections.get(name)){
              return this._collections.get(name);
          }
          var obj = require("../ageusu/" + name);
          this._collections.set(name, obj)
          return obj
   }
   Components.create = function(name){
          var args = [].slice.call(arguments)
          var obj = this.get(name)
          return obj.constructor.apply(null, args.slice(1));
   }  
})(this);