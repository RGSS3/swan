;(function(G){
  var Timer = function(callback, interval, params){
     this.callback     = callback;
     this.interval   = interval;
     this.params     = params;
  }
  Timer.prototype = Object.create({
     "setupOnce": function(){
        this.once = setTimeout(this.onTimer.bind(this), this.interval)
        return this;
     }, 
     "setupRepeat": function(){
        this.repeat = setInterval(this.onTimer.bind(this), this.interval)
        return this;
     }, 
     "onTimer": function(){
        this.callback(this.params);
     },
     "dispose": function(){
       if(this.once) clearTimeout(this.once);
       if(this.repeat) clearInterval(this.repeat);
     },
  })
  var service_ = module.exports = {
    "once": function(obj, interval, params){return new Timer(obj, interval, params).setupOnce()},
    "repeat":  function(obj, interval, params){return new Timer(obj, interval, params).setupRepeat()}
  }
})(this)