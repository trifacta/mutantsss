var assert = require('chai').assert;

var expect = require('./expect'),
    load = require('./load');

var constants = load('../lib/constants');

var CSS_RULES = require('./css-rule-sets').initial;

describe('interface', function() {
  var $$$ = load('../lib/index'),
      $$$cope,
      context = {},
      styleId;

  beforeEach(function() {
    document.body.appendChild(context.targetElement = document.createElement('div'));
    context.targetElement.setAttribute('class', 'target');
  });

  afterEach(function() {
    context.targetElement.parentNode.removeChild(context.targetElement);
    Object.keys(context).forEach(function(key) {
      delete context[key];
    });

    if (context.rootElement !== context.targetElement) {
      delete context.rootElement.dataset[constants.ROOT_PROP];
    }
  });

  expect.topLevelInterfaceOn($$$);

  describe('for invalid argument(s)', function() {
    it('does nothing', function() {
      assert.isUndefined($$$('foobar', 'baz'));
    });
  });

  describe('for corrupt association data', function() {
    beforeEach(function() {
      context.targetElement.dataset[constants.ROOT_PROP] = 'does not exist';
    });

    describe('due to a broken link', function() {
      it('throws an error', function() {
        assert.throws(function() {
          $$$(context.targetElement);
        }, /expected a <style> element/);
      });
    });

    describe('due to an invalid link', function() {
      beforeEach(function() {
        document.body.appendChild(context.bogusElement = document.createElement('div'));
        context.bogusElement.dataset[constants.ID_PROP] =
            context.targetElement.dataset[constants.ROOT_PROP];
      });

      afterEach(function() {
        context.bogusElement.parentNode.removeChild(context.bogusElement);
      });

      it('throws an error', function() {
        assert.throws(function() {
          $$$(context.targetElement);
        }, /expected a <style> element/);
      });
    });
  });

  describe('for top-level selector usage', function() {
    beforeEach(function() {
      context.rootElement = document.body;
      $$$cope = $$$('.target');
    });

    expect.associatedStyleElement(context);

    describe('with single-rule creation', function() {
      var singleRule = {
        'background-color': CSS_RULES['background-color']
      };

      beforeEach(function() {
        var ruleName = Object.keys(singleRule)[0];

        $$$cope.style(ruleName, CSS_RULES[ruleName]);
      });

      expect.stylesToMatch(context, 'targetElement', singleRule);
    });

    describe('with multi-rule creation', function() {
      beforeEach(function() {
        $$$cope.style(CSS_RULES);
      });

      expect.stylesToMatch(context, 'targetElement', CSS_RULES);
    });
  });

  describe('for scoped usage', function() {
    var $$$election;

    beforeEach(function() {
      context.scopedChild = document.createElement('div');
      context.scopedChild.setAttribute('class', 'target-child');

      context.targetElement.appendChild(context.scopedChild);
      context.rootElement = context.targetElement;
    });

    describe('with wrapped element', function() {
      beforeEach(function() {
        $$$cope = $$$(context.targetElement);
      });

      it('scopes given elements', function() {
        assert.instanceOf($$$cope, $$$.Scope);
      });

      describe('with selections', function() {
        beforeEach(function() {
          $$$election = $$$cope.select('.target-child');
          $$$election.style(CSS_RULES);
        });

        it('selects within own scope', function() {
          assert.instanceOf($$$election, $$$.Selection);
        });

        expect.associatedStyleElement(context);
        expect.stylesToMatch(context, 'scopedChild', CSS_RULES);
      });
    });

    describe('with selector', function() {
      beforeEach(function() {
        $$$election = $$$('.target-child', context.targetElement);
        $$$election.style(CSS_RULES);
      });

      it('selects within given scope', function() {
        assert.instanceOf($$$election, $$$.Selection);
      });

      expect.associatedStyleElement(context);
      expect.stylesToMatch(context, 'scopedChild', CSS_RULES);
    });
  });
});
