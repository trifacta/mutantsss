var assert = require('chai').assert;

var load = require('./load');

var constants = load('../lib/constants');

describe('mutation', function() {
  var $$$ = load('../lib/index'),
      $$$cope,
      rootElement,
      styleElement;

  function expectCleanedState () {
    it('caused disassociation & removal of style element', function() {
      assert.isNull(styleElement.parentNode);
      assert.isUndefined(rootElement.dataset[constants.ROOT_PROP]);
    });
  }

  function expectAssociatedState() {
    it('maintains association', function() {
      assert.equal(
          styleElement.dataset[constants.ID_PROP],
          rootElement.dataset[constants.ROOT_PROP]);
    });
  }

  beforeEach(function() {
    document.body.appendChild(rootElement = document.createElement('div'));
    $$$cope = $$$(rootElement);
    styleElement = document.querySelector('style[data-' + constants.ID_ATTR + '="' +
        rootElement.dataset[constants.ROOT_PROP] + '"]');

    assert.isNotNull(styleElement.parentNode);
    assert.isDefined(rootElement.dataset[constants.ROOT_PROP]);
  });

  afterEach(function() {
    if (rootElement.parentNode) {
      rootElement.parentNode.removeChild(rootElement);
    }

    if (styleElement.parentNode) {
      styleElement.parentNode.removeChild(styleElement);
    }
  });

  describe('for root element removal', function() {
    beforeEach(function(done) {
      $$$cope.once('cleanup', function() {
        done();
      });
      rootElement.parentNode.removeChild(rootElement);
    });
    
    expectCleanedState();
  });

  describe('for style element removal', function() {
    beforeEach(function(done) {
      $$$cope.once('cleanup', function() {
        done();
      });
      styleElement.parentNode.removeChild(styleElement);
    });

    expectCleanedState();
  });

  describe('for root element association corruption', function() {
    beforeEach(function(done) {
      $$$cope.once('cleanup', function() {
        done();
      });
      delete rootElement.dataset[constants.ROOT_PROP];
    });

    expectCleanedState();
  });

  describe('for style element association corruption', function() {
    beforeEach(function(done) {
      $$$cope.once('cleanup', function() {
        done();
      });
      delete styleElement.dataset[constants.ID_PROP];
    });

    expectCleanedState();
  });

  describe('for matching association change', function() {
    beforeEach(function(done) {
      $$$cope.once('change', function() {
        done();
      });
      rootElement.dataset[constants.ROOT_PROP] = styleElement.dataset[constants.ID_PROP] = 'same';
    });

    expectAssociatedState();
  });

  describe('for moved root element', function() {
    var containerElement;

    beforeEach(function(done) {
      $$$cope.once('change', function() {
        done();
      });

      containerElement = document.createElement('div');

      document.body.appendChild(containerElement);
      containerElement.appendChild(rootElement);
    });

    afterEach(function() {
      document.body.appendChild(rootElement);
      document.body.removeChild(containerElement);
    });

    expectAssociatedState();
  });

  describe('for moved style element', function() {
    beforeEach(function(done) {
      $$$cope.once('change', function() {
        done();
      });

      document.body.appendChild(styleElement);
    });
    
    afterEach(function() {
      document.head.appendChild(styleElement);
    });

    expectAssociatedState();
  });
});
