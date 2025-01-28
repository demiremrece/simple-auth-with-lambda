# Simple Auth API

This project is a serverless API built using AWS Lambda, DynamoDB, and API Gateway. The API includes the following endpoints:

- **`POST /register`**: Create a new user in DynamoDB.
- **`POST /login`**: Login with email & password, return a JWT.
- **`GET /me`**: A secured endpoint that verifies the JWT and returns the user profile.
- **`GET /stats`**: Returns the total amount of registered users.
- **`GET /health`**: Returns the health status of the API.

---

## Prerequisites

- **Node.js** (version 18)
- **AWS CLI** (configured with your credentials)
- **Serverless Framework**

### Install the Serverless Framework
```bash
npm install -g serverless
```

---

## Project Setup

### Install Dependencies
Run the following command in the project root:
```bash
npm install
```

### Environment Variables
Create a `.env` file in the project root to store your environment variables for local testing:

```plaintext
JWT_SECRET=your_jwt_secret_key
USERS_TABLE=UsersTable
AWS_REGION=us-east-1
```

---

## Local Development

### Install Plugins for Local Testing
Install the `serverless-offline` plugin:
```bash
npm install --save-dev serverless-offline
```

Update `serverless.yaml` to include the plugin:
```yaml
plugins:
  - serverless-offline
```

### Run the API Locally
Use the following command to start the API locally:
```bash
sls offline --stage dev
```

The API will be available at `http://localhost:3000/dev/`.

### Testing Endpoints Locally
You can test the endpoints using tools like **Postman**, **cURL**.

Example for `/register` using cURL:
```bash
curl --request POST \
  --url http://localhost:3000/dev/register \
  --header 'Content-Type: application/json' \
  --data '{
    "email": "demiremrece@gmail..com",
    "password": "password123",
    "firstname": "Emre",
    "lastname": "Demir"
  }'
```

---

## Deploying to AWS

### Configure AWS Credentials
Make sure your AWS CLI is configured with the proper credentials:
```bash
aws configure
```
Provide your `Access Key ID`, `Secret Access Key`, default region (e.g., `us-east-1`)

### Deploy the API
Run the following command to deploy the API to AWS:
```bash
sls deploy
```

Once the deployment is complete, you will see the API Gateway URLs for your endpoints. 

Example:
```plaintext
endpoints:
  POST - https://{api-id}.execute-api.us-east-1.amazonaws.com/dev/register
  POST - https://{api-id}.execute-api.us-east-1.amazonaws.com/dev/login
  GET  - https://{api-id}.execute-api.us-east-1.amazonaws.com/dev/me
  GET  - https://{api-id}.execute-api.us-east-1.amazonaws.com/dev/stats
  GET  - https://{api-id}.execute-api.us-east-1.amazonaws.com/dev/health
```

---

## Monitoring and Logs

### View Logs Locally
You can view logs for a specific function using the following command:
```bash
sls logs -f functionName
```
For example, to see logs for the `register` function:
```bash
sls logs -f register
```

You can also view logs in the **AWS CloudWatch** service from the AWS Management Console.

---

## Cleaning Up Resources

To remove all the deployed resources (API Gateway, Lambda functions, DynamoDB table, etc.), run:
```bash
sls remove
```

---

## Optional: Local DynamoDB Testing

If you want to test DynamoDB locally, install docker and docker compose

https://docs.docker.com/engine/install/


Run DynamoDB locally:
```bash
// Navigate to docker folder inside the repo
cd ./docker
// Build and run the container using compose.yaml
docker compose up

// Initialize db with DevUsersTable and mock user data
node ./scripts/initDb.js
```

Check all is well with DynamoDB
```bash
aws dynamodb scan \
  --table-name DevUsersTable \
  --endpoint-url http://localhost:8000
```