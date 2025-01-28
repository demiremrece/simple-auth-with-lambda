const { successResponse } = require("../utils/response");

exports.handler = async () => successResponse(200, { status: "Healthy" });
