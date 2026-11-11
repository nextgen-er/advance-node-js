const logger = require("./logger");

function createOrder(id) {
    logger.log(`Order created: ${id}`);
}

module.exports = { createOrder };
