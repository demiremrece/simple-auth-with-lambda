const { scanTable } = require("../utils/dynamodb");
const { successResponse, errorResponse } = require("../utils/response");

exports.handler = async () => {
  try {
    const users = await scanTable(process.env.USERS_TABLE);
    return successResponse(200, { totalUsers: users.length });
  } catch (error) {
    return errorResponse(500, error.message);
  }
};
