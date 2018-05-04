require('module-alias/register');

const express = require('express');
const bodyParser = require('body-parser');
const {graphqlExpress, graphiqlExpress} = require('apollo-server-express');
const schema = require('./schema');

const mongodb = require('./db');
mongodb
.connect('mongodb://localhost:27017/graphql-auth')
.on('connected', () => {
  console.log(`[${Date.now()}] MongoDB connected`);
});

const app = express();

app.use('/graphql',
  bodyParser.json(),
  graphqlExpress(req => {
    return {
      schema,
      formatError: err => {
        const {originalError} = err;
        const cause = (originalError && originalError.code) || 'Unknown error';
        const description = err.message;
        
        return {cause, description};
      },
      context: {}
    };
  })
);

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql'
}));

app.listen(3000, () => {
  console.log('Go to http://localhost:3000/graphiql to run queries.');
});