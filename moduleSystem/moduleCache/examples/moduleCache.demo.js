const logger = require("../src/logger");

const { createUser } = require("../src/userService");
const { createOrder } = require("../src/orderService");

createUser("Ankit");
createOrder(101);

console.log(logger.getLogs());
