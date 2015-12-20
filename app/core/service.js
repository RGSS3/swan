;(function(G){
   var Service = module.exports = function(name, obj){
      this.name = name
      this.obj  = obj
   };
   Service._collections = new Map();
   Service.get = function(name){
          if(this._collections.get(name)){
              return this._collections.get(name);
          }
          var obj = require("../services/" + name);
          this._collections.set(name, obj)
          return obj
   }
   Service.create = function(name){
          var args = [].slice.call(arguments)
          var obj = this.get(name)
          return obj.constructor.apply(null, args.slice(1));
   }  
})(this);