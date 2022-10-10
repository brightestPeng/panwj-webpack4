const { it, describe } = require("mocha");
const assert = require("assert");

describe("webpack.base test", () => {
  it("entry", (done) => {
    const webpackBase = require("../../lib/webpack.base");

    return new Promise((resolve) => {

      resolve();

      assert.equal(
        webpackBase.entry.home,
        "E:/study/wepack/panwj-webpack4/test/smoke/template/src/home/index.jsx"
      );

      assert.equal(
        webpackBase.entry.view,
        "E:/study/wepack/panwj-webpack4/test/smoke/template/src/view/index.jsx"
      );

      
    }).then(done());
  });
});
