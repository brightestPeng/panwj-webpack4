const { it, describe } = require("mocha");
const assert = require("assert");

describe("webpack.base test", () => {
  it("entry", (done) => {
    const webpackBase = require("../../lib/webpack.base");

    assert.equal(
      webpackBase.entry.home.indexOf(
        "panwj-webpack4/test/smoke/template/src/home/index.jsx"
      ) !== -1,
      true
    );

    assert.equal(
      webpackBase.entry.view.indexOf(
        "panwj-webpack4/test/smoke/template/src/view/index.jsx"
      ) !== -1,
      true
    );

    done();
  });
});
