[![Build Status](https://img.shields.io/travis/trifacta/mutantsss.svg?style=flat)](https://travis-ci.org/trifacta/mutantsss)
[![Coverage Status](https://img.shields.io/coveralls/trifacta/mutantsss.svg?style=flat)](https://coveralls.io/r/trifacta/mutantsss)
[![NPM version](https://img.shields.io/npm/v/mutantsss.svg?style=flat)](https://www.npmjs.com/package/mutantsss)
[![Dependency Status](https://img.shields.io/david/trifacta/mutantsss.svg?style=flat)](https://david-dm.org/trifacta/mutantsss)
[![devDependency Status](https://img.shields.io/david/dev/trifacta/mutantsss.svg?style=flat)](https://david-dm.org/trifacta/mutantsss#info=devDependencies)
# $$$
A tool for efficient programmatic definition & management of CSS rules scoped to specific DOM elements.

Some explanation &rarr; [slides](http://trifacta.github.io/mutantsss/slides/)
## Installation
```
npm install mutantsss
```
## Usage
### Standalone
```html
<script src="mutantsss.js"></script>
<script>

  var clockElement = document.querySelector('.clock');
  
  $$$('.now')
      .style('content', new Date().toString());
  
  $$$('.now', clockElement)
      .style('content', new Date().toString());
  
  $$$(clockElement)
      .select('.now')
      .style({
        content: new Date().toString()
      });
      
</script>
```
### Module
```javascript
var $$$ = require('mutantsss');

// use same API as with standalone usage
```
