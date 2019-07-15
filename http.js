const redis = require('async-redis');
const uuid = require('uuid/v4');

const { runRequestAt } = require('./libs');

const client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_HOST,
  password: process.env.REDIS_PASSWORD,
});

const EXPIRY_SECS = process.env.REDIS_TTL;

// FIXME: actual validation, ideally via openAPI spec
const validatePayload = data => data;

// TODO: add logic to set rule for scheduling reservation
const setReservationSchedule = () => {
};

module.exports.createBonfimFixtureById = async (event) => {
  const id = uuid();
  let date;
  let time;
  let court;

  try {
    ({ date, time, court } = validatePayload(
      JSON.parse(event.body),
    ));
  } catch (e) {
    return {
      statusCode: 400,
      body: JSON.stringify({ code: 400, message: e }),
    };
  }

  try {
    const reserveAt = runRequestAt(date, 'bonfim');
    const data = {
      date,
      time,
      court,
      reserveAt: reserveAt.toISOString(),
      status: 'acknowledged',
    };
    // into ['id', id, 'date', date, ...]
    const zipped = Object.entries(data).reduce(
      (arr, keyValue) => [...arr, ...keyValue],
      [],
    );
    await client.hmset(id, zipped);
    await client.expire(id, EXPIRY_SECS);
    // async send schedule; we don't await the response
    setReservationSchedule();
    return {
      statusCode: 202,
      headers: {
        link: `/bonfim/${id}`,
      },
      body: JSON.stringify({ id }),
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ code: 500, message: e }),
    };
  }
};

module.exports.showBonfimFixtureById = async (event) => {
  const { id } = event.pathParameters;
  const data = await client.hgetall(id);

  return {
    statusCode: data ? 200 : 404,
    body: data ? JSON.stringify(data) : undefined,
  };
};

module.exports.deleteBonfimFixtureById = async (event) => {
  const { id } = event.pathParameters;
  const deleted = await client.del(id);
  return {
    statusCode: deleted ? 204 : 404,
  };
};
