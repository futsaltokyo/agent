
module.exports.showBonfimFixtureById = async (event) => {
  // TODO
  const { id } = event.pathParameters;
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Simulating fetching Bonfim reservation ${id}`,
      input: event,
    }, null, 2),
  };
};
