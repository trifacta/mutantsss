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