var Selection = require('./selection'),
    constants = require('./constants');

var __scope_id = 0,
    __selections = {};

require('mutationobserver-shim');

function idSelector(rootId) {
  return '[data-' + constants.ID_ATTR + '="' + rootId + '"]';
}

function rootSelector(rootId) {
  return '[data-' + constants.ROOT_ATTR + '="' + rootId + '"]';
}

var Scope = module.exports = function Scope(element) {
  var styleId = element.dataset[constants.ROOT_PROP];

  this.style = styleId ? document.querySelector(idSelector(styleId)) : (function(styleElement) {
    styleId = styleElement.dataset[constants.ID_PROP] = __scope_id++;
    element.dataset[constants.ROOT_PROP] = styleId;
    styleElement.appendChild(document.createTextNode('')); // webkit hack(?)
    document.head.appendChild(styleElement);

    return styleElement;
  })(document.createElement('style'));

  if (!this.style || !/style/i.test(this.style.tagName)) {
    throw new Error('expected a <style> element, but got: ' + this.style);
  }

  __selections[this.id = styleId] = __selections[this.id = styleId] || {};

  var self = this,
      elementParent = element.parentNode,
      styleParent = this.style.parentNode,
      observer;

  function observerSetup() {
    observer.disconnect();
    observer.observe(element, { attributes: true });
    observer.observe(self.style, { attributes: true });
    observer.observe(element.parentNode, { childList: true });
    observer.observe(self.style.parentNode, { childList: true });
  }

  function handleRemove(mutation, element) {
    if (Array.prototype.slice.call(mutation.removedNodes).some(function(node) {
      return node === element;
    })) {
      if (element.parentNode) {
        observerSetup();
      } else {
        return true;
      }
    }

    return false;
  }

  observer = new MutationObserver(function(mutations) {
    var cleanup = false;

    mutations.some(function(mutation) {
      switch (mutation.target) {
        case element:
        case self.style:
          if (element.dataset[constants.ROOT_PROP] !== self.style.dataset[constants.ID_PROP]) {
            cleanup = true;
          }
          break;
        case elementParent:
          cleanup = handleRemove(mutation, element);
          break;
        case styleParent:
          cleanup = handleRemove(mutation, self.style);
          break;
      }

      if (cleanup) {
        observer.disconnect();
        observer = undefined;

        if (self.style.parentNode) {
          self.style.parentNode.removeChild(self.style);
        }

        delete element.dataset[constants.ROOT_PROP];
        delete __selections[self.id];
        self.emit('cleanup', mutation);

        return true; // "break" out of Array.prototype.some
      } else {
        self.emit('change', mutation);
      }
    });
  });

  observerSetup();

  this.rootSelector = rootSelector(styleId);
  this.selectorIndices = {};
};

require('util').inherits(Scope, require('events').EventEmitter);

Scope.prototype.select = function(selector) {
  return __selections[this.id][selector] ||
      (__selections[this.id][selector] = new Selection(this, selector));
};
