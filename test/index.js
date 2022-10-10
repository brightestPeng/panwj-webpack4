const { describe } = require("mocha");
const path = require("path");

process.chdir(path.join(__dirname, "./smoke/template/lib"));

describe("panwj-webpack4 webpack test", () => {
  require("./unit/webpack_base.test");
});
