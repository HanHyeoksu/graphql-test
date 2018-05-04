const fs = require('fs');

module.exports =
  fs.readdirSync(__dirname)
    .filter(filename =>
      filename !== 'index.js' &&
      filename.endsWith('.js')      
    )
    .reduce((models, filename) => {
      const model = require(`./${filename}`);
      models[model.modelName] = model;
      return models;
    }, {});