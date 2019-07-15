const { runRequestAt } = require('../libs');

describe('libs.runRequestAt', () => {
  test.each([
    'unsupported',
    'shibuya',
    'kawasaki',
  ])(
    'runRequestAt(date, %s) throw Error for unsupported location',
    (location) => {
      expect(() => runRequestAt(new Date(), location)).toThrow();
    },
  );

  test.each([
    ['2018-09-01', 'bonfim', '2018-07-01'],
    ['2019-01-31', 'bonfim', '2018-11-30'], // there is no 31 Nov
    ['2018-04-31', 'bonfim', '2018-03-01'], // there is no 31 Feb
    ['2018-04-30', 'bonfim', '2018-02-28'],
    ['2020-02-29', 'bonfim', '2019-12-29'], // check leap year in 2020
    ['2020-04-31', 'bonfim', '2020-03-01'],
    ['2020-04-30', 'bonfim', '2020-02-29'],
  ])(
    'runRequestAt(%s, %s) should return %s',
    (reservationDate, location, expected) => {
      const actionableDate = runRequestAt(reservationDate, location);
      const expectedDate = new Date(expected);
      expect(actionableDate.toISOString()).toEqual(expectedDate.toISOString());
    },
  );
});
