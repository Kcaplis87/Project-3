// dependecies
const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');

// connect to event DB
const Event = require('./models/event');

// connecting express
const app = express();


app.use(bodyParser.json());

// graphql middleware
app.use('/graphql', graphqlHttp({
    schema: buildSchema(`
    type Event {
        _id: ID!
        title: String!
        description: String!
        price: Float!
        date: String!
    }

    input EventInput {
        title: String!
        description: String!
        price: Float!
        date: String!
    }

    type RootQuery {
        events: [Event!]!
    }

    type RootMutation {
        createEvent(eventInput: EventInput): Event
    }
    schema {
        query: RootQuery
        mutation: RootMutation
    }
    `),
    rootValue: {
        events: () => {
           return Event.find()
            .then(events => {
                return events.map(event => {
                    return { ...event._doc, _id: event.id };
                });
            })
            .catch(err => {
                throw err;
            })
        },
        createEvent: args => {
            const event = new Event({
                title: args.eventInput.title,
                description: args.eventInput.description,
                price: +args.eventInput.price,
                date: new Date(args.eventInput.date)
            })
            // Lets graphql know this is an async event
            // the .save is a mongoose method to write and save info into DB
           return event.save().then( result => {
               console.log(result);
            // propety that give us all the core properties of out object/leave out meta data
               return { ...result._doc, _id: event.id  };
           }).catch(err => {
               console.log(err);
               throw err;
           });
        }
    },
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

