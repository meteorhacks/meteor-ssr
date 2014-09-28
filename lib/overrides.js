// we don't need autorun to go through Tracker
Blaze.View.prototype.autorun = function(f) {
  var handler = {stop: function() {}};
  f.call(this, handler);
  return handler;
};

// if we get a cursor from a templateHelper
// we need fetch the data
// observering us useless and throw errors
var originalLookup = Blaze.View.prototype.lookup;
Blaze.View.prototype.lookup = function(key) {
  var helper = originalLookup.apply(this, arguments);
  return wrapHelper(helper);
};

function wrapHelper(helper) {
  if(typeof helper != 'function') {
    return helper;
  }

  return function() {
    var res = helper.apply(this, arguments);
    if(res && typeof res.observeChanges == 'function') {
      return res.fetch();
    } else {
      return res;
    }
  }
}