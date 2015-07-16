var assert = require('chai').assert;

var load = require('./load');

var constants = load('../lib/constants');

function getStyleId(element) {
  return element.dataset[constants.ROOT_PROP];
}

function getStyleElement(styleId) {
  return document.querySelector('style[data-' + constants.ID_ATTR + '="' + styleId + '"]');
}

module.exports = {
  topLevelInterfaceOn: function(target) {
    it('is a function taking 2 arguments', function() {
      assert.typeOf(target, 'function');
      assert.lengthOf(target, 2);
    });
  },
  associatedStyleElement: function(context) {
    it('associated a style element', function() {
      assert.isDefined(getStyleElement(getStyleId(context.rootElement)));
    });
  },
  stylesToMatch: function(context, name, props) {
    it('styled "' + name + '" as: ' + JSON.stringify(props), function() {
      var computedStyle = getComputedStyle(context[name]);

      Object.keys(props).forEach(function(prop) {
        assert.equal(computedStyle[prop], props[prop] || 'rgba(0, 0, 0, 0)');
      });
    });
  }
};
