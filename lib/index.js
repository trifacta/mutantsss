var $$$ = module.exports = function $$$(selector, element) {
  element = selector instanceof HTMLElement ? selector : (element || document.body);
  selector = selector === element ? undefined : selector;

  var scope, selection;

  if (element instanceof HTMLElement) {
    scope = new Scope(element);

    if (typeof selector === 'string') {
      selection = scope.select(selector);
    }
  }

  return selection || scope;
};

var Scope = $$$.Scope = require('./scope'),
    Selection = $$$.Selection = require('./selection');

$$$.constants = require('./constants');
