const authResolver = require('./auth');
const eventsResolver = require('./events');
const bookingResolver = require('./booking');
const savedCharityResolver = require('./savedCharityResolver');

const rootResolver = {
  ...authResolver,
  ...eventsResolver,
  ...bookingResolver,
  ...savedCharityResolver
};

module.exports = rootResolver;