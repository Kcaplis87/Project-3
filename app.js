// dependecies
const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');

// connecting graphQl Schema (from schema folder)
const graphQlSchema = require('./graphql/schema/index');
// connecting graphQl Resolver (from resolver folder)
const graphQlResolvers = require('./graphql/resolvers/index');
//connecting isAuth middleware file 
const isAuth = require('./middleware/is-auth');

// connecting express for routes
const app = express();

// connect bodyparser middleware
app.use(bodyParser.json());

// configure headers middle ware
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// connect isAuth middleware
app.use(isAuth);


// connects graphql middleware
app.use(
  '/graphql',
  graphqlHttp({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true
  })
);

// connecting to cloud db via mongo Atlas 
// mongoose
// .connect(
//     `mongodb+srv://${process.env.MONGO_USER}:${
//     process.env.MONGO_PASSWORD
//     }@cluster0-hh00e.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`,
//     { useNewUrlParser: true }
// ) 

//connecting to local db or cloud db via heroku
const mongoURL = process.env.MONGODB_URI|| "mongodb://localhost:27017/eventsDB"
mongoose.connect(mongoURL, {useNewUrlParser: true})
.then(() => {
    app.listen(8000);
  })
  .catch(err => {
    console.log(err);
  });
