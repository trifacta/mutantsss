var expect = require('./expect'),
    load = require('./load');

var CSS_RULE_SETS = require('./css-rule-sets');

describe('style', function() {
  var $$$ = load('../lib/index'),
      $$$election,
      context = {};

  beforeEach(function() {
    document.body.appendChild(context.containerElement = document.createElement('div'));
    context.containerElement.appendChild(context.targetElement = document.createElement('div'));
    context.targetElement.setAttribute('class', 'style-test-target');
    $$$election = $$$('.style-test-target', context.containerElement);
  });

  afterEach(function() {
    context.targetElement.parentNode.removeChild(context.targetElement);
    context.containerElement.parentNode.removeChild(context.containerElement);
    Object.keys(context).forEach(function(key) {
      delete context[key];
    });
  });

  describe('rule change', function() {
    beforeEach(function() {
      $$$election.style(CSS_RULE_SETS.initial);
      $$$election.style(CSS_RULE_SETS.change);
    });

    expect.stylesToMatch(context, 'targetElement', CSS_RULE_SETS.change);
  });

  describe('rule identical change', function() {
    beforeEach(function() {
      $$$election.style(CSS_RULE_SETS.initial);
      $$$election.style(CSS_RULE_SETS.initial);
    });

    expect.stylesToMatch(context, 'targetElement', CSS_RULE_SETS.initial);
  });

  describe('rule clearing', function() {
    beforeEach(function() {
      $$$election.style(CSS_RULE_SETS.initial);
      $$$election.style(CSS_RULE_SETS.reset);
    });

    expect.stylesToMatch(context, 'targetElement', CSS_RULE_SETS.reset);
  });
});
