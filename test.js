const assert = require("node:assert");
const { greet } = require("./index");

assert.strictEqual(greet("Sam"), "Hello, Sam!");
assert.strictEqual(greet(), "Hello, world!");

console.log("All tests passed.");
