function dashedToCamel(dashed) {
  var words = dashed.split('-');

  return words.shift() + words.map(function(word) {
    return word.charAt(0).toUpperCase() + word.substr(1);
  }).join('');
}

var ID_ATTR = 'mutantsss-id',
    ROOT_ATTR = 'mutantsss-root';

module.exports = {
  ID_ATTR: ID_ATTR,
  ID_PROP: dashedToCamel(ID_ATTR),
  ROOT_ATTR: ROOT_ATTR,
  ROOT_PROP: dashedToCamel(ROOT_ATTR)
};

