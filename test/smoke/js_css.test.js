const { describe, it } = require("mocha");
const glob = require("glob");

describe("Checking generated js and css files", () => {
  it("should generated js files", (done) => {
    const files = glob.sync("../dist/js/*.*.js");

    if (files.length > 0) {
      done();
    } else {
      throw new Error("generated js file error");
    }
  });

  it("should generated css files", (done) => {
    const files = glob.sync("../dist/css/*.*.css");

    if (files.length > 0) {
      done();
    } else {
      throw new Error("generated css file error");
    }
  });
});
