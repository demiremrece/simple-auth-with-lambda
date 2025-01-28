const AWS = require("aws-sdk");

// Use the local DynamoDB instance when running locally
const isOffline = process.env.IS_OFFLINE;

const dynamoDb = new AWS.DynamoDB.DocumentClient({
  region: isOffline ? "localhost" : "us-east-1",
  endpoint: isOffline ? "http://localhost:8000" : undefined,
});

exports.putItem = (TableName, Item) => dynamoDb.put({ TableName, Item }).promise();
exports.getItem = (TableName, keyName, keyValue) =>
  dynamoDb.get({ TableName, Key: { [keyName]: keyValue } }).promise().then((res) => res.Item);
exports.scanTable = (TableName) => dynamoDb.scan({ TableName }).promise().then((res) => res.Items);

exports = dynamoDb;
