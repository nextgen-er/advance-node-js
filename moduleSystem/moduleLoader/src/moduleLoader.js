const fs = require("fs");
const path = require("path");

/**
 * Loads and executes a CommonJS module.
 *
 * @param {string} filename
 * @param {Object} module
 * @param {Function} require
 */
function loadModule(filename, module, require) {
    // Read the source code
    const source = fs.readFileSync(filename, "utf8");

    // Wrap the source exactly like Node.js does
    const wrappedSource = `
(function (module, exports, require) {
${source}
})(module, module.exports, require);
`;

    // Execute the wrapped code
    eval(wrappedSource);
}

/**
 * Tiny implementation of require()
 */
function myRequire(modulePath) {

    const absolutePath = path.resolve(modulePath);

    const module = {
        exports: {}
    };

    loadModule(
        absolutePath,
        module,
        myRequire
    );

    return module.exports;
}

module.exports = {
    loadModule,
    myRequire
};
