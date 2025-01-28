exports.successResponse = (statusCode, body) => ({
  statusCode,
  body: JSON.stringify(body),
});

exports.errorResponse = (statusCode, message) => ({
  statusCode,
  body: JSON.stringify({ message }),
});
