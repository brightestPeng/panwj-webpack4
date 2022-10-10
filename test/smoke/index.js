const webpack = require("webpack");
const rimraf = require("rimraf");
const path = require("path");
const fs = require("fs");
const Mocha = require("mocha");

const libPath = path.resolve(__dirname, "template/lib");

if(!fs.existsSync(libPath)){
  fs.mkdirSync(libPath)
}

process.chdir(libPath);

const mocha = new Mocha();

// 删除生成的dist目录
rimraf("./dist", () => {
  const prodConfig = require("../../lib/webpack.prod.js");

  webpack(prodConfig, (error, stat) => {
    if (error) {
      console.log(error);
      process.exit(-1);
    }

    console.log(
      stat.toString({
        colors: true,
        modules: false,
        children: false,
      })
    );

    mocha.addFile(path.join(__dirname,'html.test.js'))
    mocha.addFile(path.join(__dirname,'js_css.test.js'))
    mocha.run();
  });
});
