define(function(){
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
  
  return util;
});
