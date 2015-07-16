var Selection = module.exports = function Selection(scope, selector) {
  this.styleSheet = scope.style.sheet;
  this.rules = this.styleSheet.cssRules;
  this.indices = scope.selectorIndices[selector] = scope.selectorIndices[selector] || {};
  this.selector = scope.rootSelector + ' ' + selector;
};

Selection.prototype.style = function(props) {
  props = typeof props === 'string' ? (function(value) {
    var obj = {};
    obj[props] = String(value);
    return obj;
  })(arguments[1]) : props;

  Object.keys(props).forEach(function(name) {
    var value = props[name],
        rule = (value === null || value === undefined) ? '' : name + ': ' + value + '; ',
        index = this.indices[name] =
            this.indices[name] !== undefined ? this.indices[name] : this.rules.length;

    if (index < this.rules.length) {
      if (this.rules[index].style.cssText.trim() === rule.trim()) {

        // If same exact rule already exists, don't rewrite (layout/paint optimization)
        return;
      }

      // If a rule already exists, remove it before adding the new one
      this.styleSheet.deleteRule(index);
    }

    // Only add a new rule if there was a value given (i.e. rules are cleared if set to `null`)
    if (rule) {
      this.styleSheet.insertRule(this.selector + '{' + rule + '}', index);
    }
  }, this);

  return this;
};
