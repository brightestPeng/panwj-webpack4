const glob = require("glob");

describe("Checking generated html files", () => {
  it("shoudle generated html files", (done) => {
    const files = glob.sync("../dist/*.html");

    if (files.length > 0) {
      done();
    } else {
      throw new Error("generated html files error");
    }
  });
});
