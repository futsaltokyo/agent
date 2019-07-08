// Policy helper function
const generatePolicy = (principalId, effect, resource) => {
  const authResponse = {};
  authResponse.principalId = principalId;
  if (effect && resource) {
    const policyDocument = {};
    policyDocument.Version = '2012-10-17';
    policyDocument.Statement = [];
    const statementOne = {};
    statementOne.Action = 'execute-api:Invoke';
    statementOne.Effect = effect;
    statementOne.Resource = resource;
    policyDocument.Statement[0] = statementOne;
    authResponse.policyDocument = policyDocument;
  }
  return authResponse;
};

module.exports.authorize = (event, context, callback) => {
  const authHeader = event.authorizationToken;
  if (!authHeader) {
    return callback('Unauthorized');
  }

  const encoded = authHeader.split(' ')[1];
  const decoded = Buffer.from(encoded, 'base64').toString('utf-8');
  const [userName, password] = decoded.split(':');

  // FIXME: actual creds to compare via ENV
  const passed = (userName === 'admin' && password === 'secret');
  if (!passed) {
    return callback('Unauthorized');
  }

  return callback(null, generatePolicy(userName, 'Allow', event.methodArn));
};
