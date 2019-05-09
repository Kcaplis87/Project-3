const authResolver = require('./auth');
const eventsResolver = require('./events');
const bookingResolver = require('./booking');
const charityResolver = require('./charityResolver');

const rootResolver = {
  ...authResolver,
  ...eventsResolver,
  ...bookingResolver,
  ...charityResolver
};

module.exports = rootResolver;