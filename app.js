// dependecies
const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// connect to models db
const Event = require('./models/event');
const User = require('./models/user');

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

    type User {
        _id: ID!
        email: String!
        password: String

    }

    input EventInput {
        title: String!
        description: String!
        price: Float!
        date: String!
    }

    input UserInput {
        email: String!
        password: String!
    }

    type RootQuery {
        events: [Event!]!
    }

    type RootMutation {
        createEvent(eventInput: EventInput): Event
        createUser(userInput: UserInput): User
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
        // function to creat new event in db
        createEvent: args => {
            const event = new Event({
                title: args.eventInput.title,
                description: args.eventInput.description,
                price: +args.eventInput.price,
                date: new Date(args.eventInput.date),
                creator: '5cc51986f4fea6314199b568'
            });
            // Lets graphql know this is an async event
            
            let createdEvent;
            return event
            // the .save is a mongoose method to write and save info into DB
                .save()
                .then(result => {
                    createdEvent = { ...result._doc, _id: event.id };
                   return User.findById('5cc51986f4fea6314199b568')
                })
                .then(user => {
                    if (!user) {
                        throw new Error('User not found.')
                    }
                    user.createdEvents.push(event);
                    return user.save();
                })
                .then(result => {
                    return createdEvent;
                })
                .catch(err => {
                    console.log(err);
                    throw err;
                });
        },
        // function to create new user in db
        createUser: args => {
            // validates to allow only one user
            return User.findOne({ email: args.userInput.email }).then(user => {
                if (user) {
                    throw new Error('User exist already.')
                }
                // encyrpts password with 12 rounds of salting
                return bcrypt
                    .hash(args.userInput.password, 12)
            })
                .then(hashedPassword => {
                    const user = new User({
                        email: args.userInput.email,
                        password: hashedPassword
                    });
                    return user.save()
                })
                .then(result => {
                    return { ...result._doc, password: null, _id: result.id };
                })
                .catch(err => {
                    throw err;
                })
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

