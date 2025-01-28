const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
const { putItem, getItem } = require("../utils/dynamodb");
const { successResponse, errorResponse } = require("../utils/response");

exports.handler = async (event) => {
  try {
    const { email, password, firstname, lastname } = JSON.parse(event.body);

    if (!email || !password || !firstname || !lastname) {
      return errorResponse(400, "Missing required fields.");
    }


    const userExists = await getItem(process.env.USERS_TABLE, "email", email);
    if(userExists) {
      return errorResponse(400, "User already exists.");
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const userId = uuidv4();

    const user = {
      id: userId,
      email,
      password: hashedPassword,
      firstname,
      lastname,
    };

    await putItem(process.env.USERS_TABLE, user);

    return successResponse(201, { message: "User created successfully.", userId });
  } catch (error) {
    return errorResponse(500, error.message);
  }
};
