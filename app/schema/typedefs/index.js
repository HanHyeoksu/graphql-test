const fs = require('fs');

module.exports =
  fs.readdirSync(__dirname)
    .filter(filename =>
      filename !== 'index.js' &&
      filename.endsWith('.js')
    )
    .map(filename => require(`./${filename}`));