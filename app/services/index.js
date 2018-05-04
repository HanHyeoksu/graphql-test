const fs = require('fs');

fs.readdirSync(__dirname)
  .filter(filename =>
    filename !== 'index.js' &&
    filename.endsWith('.js')      
  )
  .reduce((services, filename) => {
    const service = require(`./${filename}`)(services);
    services[service.name] = service;
    return services;
  }, exports);