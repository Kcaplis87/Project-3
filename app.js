// dependecies
const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');

// connecting graphQl Schema (from schema folder)
const graphQlSchema = require('./graphql/schema/index');
// connecting graphQl Resolver (from resolver folder)
const graphQlResolvers = require('./graphql/resolvers/index');

// connecting express
const app = express();


app.use(bodyParser.json());

// used to get multipul event IDs
const events = eventIds => {
    return Event.find({ _id: { $in: eventIds } })
        .then(events => {
            return events.map(event => {
                return {
                    ...event._doc,
                    _id: event.id,
                    creator: user.bind(this, event.creator)
                };
            });
        })
        .catch(err => {
            throw err;
        })
}


// populate and merges user with created event for more flexability
const user = userId => {
    return User.findById(userId)
        .then(user => {
            return {
                ...user._doc,
                _id: user.id,
                createdEvents: events.bind(this, user._doc.createdEvent)
            };
        })
        .catch(err => {
            throw err;
        })
}

// graphql middleware
app.use('/graphql', graphqlHttp({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true
})
);

// connecting db
mongoose.connect(
    `mongodb+srv://${process.env.MONGO_USER}:${
    process.env.MONGO_PASSWORD
    }@cluster0-hh00e.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`,
    { useNewUrlParser: true }
).then().catch(err => {
    console.log(err);
});

app.listen(3000);

