
// connect to models db
const Booking = require('../../models/booking');
const Event = require('../../models/event');
// connect to merge file
const {transformEvent, transfromBooking} = require('./merge');



  module.exports = {
    bookings: async () => {
      try {
        const bookings = await Booking.find();
        return bookings.map(booking => {
          return transfromBooking(booking);
        });
      } catch (err) {
        throw err;
      }
    },
    bookEvent: async args => {
        const fetchedEvent = await Event.findOne({ _id: args.eventId });
        const booking = new Booking({
          user: '5cc51986f4fea6314199b568',
          event: fetchedEvent
        });
        const result = await booking.save();
        return transfromBooking(result);
    },
    cancelBooking: async args => {
        try {
            const booking = await Booking.findById(args.bookingId).populate('event');
            const event = transformEvent(booking.event);
            await Booking.deleteOne({ _id: args.bookingId });
            return event;
          } catch (err) {
            throw err;
          }
    }
  };