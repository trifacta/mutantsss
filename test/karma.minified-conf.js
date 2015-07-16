module.exports = function(config) {
  require('./karma.conf')({ set: function(settings) {
    settings.files.unshift('dist/mutantsss.min.js');
    config.set(settings);
  } });
};
