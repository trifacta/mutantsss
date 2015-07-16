module.exports = function(config) {
  require('./karma.conf')({ set: function(settings) {
    settings.browserify.transform = [require('browserify-istanbul')];
    settings.reporters.push('coverage');
    settings.coverageReporter = { type: 'lcov' };
    config.set(settings);
  } });
};
