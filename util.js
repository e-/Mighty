define(['config'], function(config){
  var util = {};

  // HTML escape function
  (function(util){
    var entityMap = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': '&quot;',
      "'": '&#39;',
      "/": '&#x2F;'
    };
    util.escape = function(string){
      return String(string).replace(/[&<>"'\/]/g, function (s) {
        return entityMap[s];
      });
    };
  })(util);
 
  util.arrayRemove = function(arr) {
    var what, a = arguments, L = a.length, ax;
    while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax= arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
        }
    }
    return arr;
  };
  
  util.getUID = function(){
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
               .toString(16)
               .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
           s4() + '-' + s4() + s4() + s4();
  }
  
  util.getRelativePlayerNumber = function(playerNumber, myPlayerNumber) {
    var pn = playerNumber - myPlayerNumber;
    if(pn < 0) pn += config.room.playerMaximumNumber;
    return pn;
  };

  return util;
});
