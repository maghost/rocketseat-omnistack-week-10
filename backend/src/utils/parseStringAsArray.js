module.exports = arrayAsString =>
  arrayAsString.split(',').map(item => item.trim());
