var modules = {
  '../lib/constants': {
    bundled: window.$$$ && window.$$$.constants,
    local: require('../lib/constants')
  },
  '../lib/index': {
    bundled: window.$$$,
    local: require('../lib/index')
  }
};

module.exports = function(path) {
  return (function(module) {
    return module.bundled || module.local;
  })(modules[path]);
};
