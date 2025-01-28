const { verifyToken } = require("../utils/jwt");
const { getItem } = require("../utils/dynamodb");
const { successResponse, errorResponse } = require("../utils/response");

exports.handler = async (event) => {
  try {
    const authorizationHeader = event.headers.Authorization;
    const token = authorizationHeader.replace("Bearer ", "");
    console.log({token});
    if (!token) {
      return errorResponse(401, "Token missing.");
    }

    const decoded = verifyToken(token);
    const user = await getItem(process.env.USERS_TABLE, "email", decoded.email);
    if (!user) {
      return errorResponse(404, "User not found.");
    }

    delete user.password; // Exclude password from the response
    return successResponse(200, { user });
  } catch (error) {
    return errorResponse(401, "Invalid or expired token.");
  }
};
