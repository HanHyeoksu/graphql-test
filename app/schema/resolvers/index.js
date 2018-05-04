const fs = require('fs');

module.exports =
  fs.readdirSync(__dirname)
    .filter(filename =>
      filename !== 'index.js' &&
      filename.endsWith('.js')
    )
    .reduce((resolvers, filename) => {
      const {Query, Mutation} = require(`./${filename}`);
      Object.assign(resolvers.Query, Query);
      Object.assign(resolvers.Mutation, Mutation);
      return resolvers;
    }, {Query: {}, Mutation: {}});