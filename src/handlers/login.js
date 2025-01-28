const bcrypt = require("bcryptjs");
const { getItem } = require("../utils/dynamodb");
const { generateToken } = require("../utils/jwt");
const { successResponse, errorResponse } = require("../utils/response");

exports.handler = async (event) => {
  try {
    const { email, password } = JSON.parse(event.body);

    if (!email || !password) {
      return errorResponse(400, "Missing required fields.");
    }

    const user = await getItem(process.env.USERS_TABLE, "email", email);
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return errorResponse(401, "Invalid email or password.");
    }

    const token = generateToken({ email: user.email });
    return successResponse(200, { token });
  } catch (error) {
    return errorResponse(500, error.message);
  }
};
