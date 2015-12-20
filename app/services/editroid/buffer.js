;(function(G){
   var app = require("../../core/app")
   var util = require("util")
   var emitter = require("events").EventEmitter;
   var buffer = module.exports = function(name){
      emitter.call(this)
      this.id       = ++buffer.id;
      this.name     = name;
      this.filename = null;
      this._content = "" 
      this._timer   = ""
   }
   util.inherits(buffer, emitter);
   var fs = require("fs")
   buffer.id = 0;
   buffer.prototype.loadFrom = function(filename){
         if(this._timer) {this._timer.dispose; this._timer = null;}
         this.emit("beforeRead", this, filename);
         this.content = fs.readFileSync(filename);
         this.emit("afterRead",  this, filename);
         this.filename = filename;      
         this.timer    = app.service.get("timer").repeat(this.onTick.bind(this), 100)
         this.stats = fs.statSync(this.filename)
         this.removeAllListeners("change");
      }
   buffer.prototype.onTick = function(params){
         var f;
         try{
           f = fs.statSync(this.filename)
         }catch(e){
           f = null;
         }
         if(!f || f.mtime.toString() !== this.stats.mtime.toString()){
             this.stats = fs.statSync(this.filename)
             this.emit('change', this);
         }
      }
    buffer.prototype.save = function(){
         this.emit("beforeSave", this, filename);
         fs.writeFileSync(filename, this.content);
         this.emit("afterSave", this, filename);
   }
   

   Object.defineProperty(buffer.prototype, "content", {"get": function(){
	return this._content;
   }, "set": function(val){
        this._content = val;
   }});


})(this);