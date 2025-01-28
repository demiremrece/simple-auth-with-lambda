const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");


const dynamoDb = new AWS.DynamoDB({
  endpoint: "http://localhost:8000",
  region: "us-east-1",
});

const createTables = async () => {
  const tables = [
    {
      TableName: "DevUsersTable",
      KeySchema: [{ AttributeName: "email", KeyType: "HASH" }],
      AttributeDefinitions: [
        { AttributeName: "email", AttributeType: "S" },
      ],
      BillingMode: "PAY_PER_REQUEST",
    },
  ];

  for (const table of tables) {
    try {
      console.log(`Creating table: ${table.TableName}`);
      await dynamoDb.createTable(table).promise();
      console.log(`Table created: ${table.TableName}`);
    } catch (err) {
      if (err.code === "ResourceInUseException") {
        console.log(`Table already exists: ${table.TableName}`);
      } else {
        console.error(`Unable to create table: ${table.TableName}`, err);
      }
    }
  }
};

const seedData = async () => {
  const documentClient = new AWS.DynamoDB.DocumentClient({
    endpoint: "http://localhost:8000",
    region: "us-east-1",
  });

  const users = require("./users.json");

  for (const user of users) {
    try {
      console.log(`Seeding user: ${user.firstname} ${user.lastname}`);
      await documentClient
        .put({
          TableName: "DevUsersTable",
          Item: user,
        })
        .promise();
      console.log(`User seeded: ${user.firstname} ${user.lastname}`);
    } catch (err) {
      console.error(`Unable to seed user: ${user.id}`, err);
    }
  }
};

const initialize = async () => {
  await createTables();
  await seedData();
};

initialize();
