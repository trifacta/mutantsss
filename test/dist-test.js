var expect = require('./expect');

if (typeof window.$$$ !== 'undefined') {
  describe('dist', function() {
    expect.topLevelInterfaceOn(window.$$$);
  });
}
