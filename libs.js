const subMonths = require('date-fns/sub_months');

const LOCATIONS_RESERVATION_IN_ADVANCED_MAP = {
  bonfim: date => subMonths(date, 2),
};

module.exports.runRequestAt = (reservationDate, location) => {
  const reserveInAdvance = LOCATIONS_RESERVATION_IN_ADVANCED_MAP[location];
  if (!reserveInAdvance) {
    throw new Error('location is not supported');
  }
  const date = reservationDate instanceof Date ? reservationDate : new Date(reservationDate);
  return reserveInAdvance(date);
};
