const logger = require("./logger");

function createUser(name) {
    logger.log(`User created: ${name}`);
}

module.exports = { createUser };
