module.exports = function(config) {
  config.set({
    basePath: '../',
    frameworks: ['mocha', 'browserify'],
    browserify: { watch: true },
    files: ['test/*.js'],
    preprocessors: { 'test/*.js': 'browserify' },
    reporters: ['progress'],
    browsers: ['PhantomJS']
  });
};
