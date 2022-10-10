if (typeof window === "undefined") {
  window = {};
}

const express = require("express");
const { renderToString } = require("react-dom/server");
const glob = require("glob");
const path = require("path");
const fs = require("fs");

const baseData = {
  peng: 123,
};

function createHtml(baseHtml, html) {
  const data = JSON.stringify(baseData);

  return baseHtml
    .replace("<!-- HTML_PLACEHOLDER -->", html)
    .replace(
      "<!-- INITAL_DATA_PLACEHOLDER -->",
      `<script>window.__inital_data = ${data};</script>`
    );
}

function start(port) {
  const app = express();

  const entryFiles = glob.sync(path.join(__dirname, "../src/**/index.ssr.jsx"));

  console.log(entryFiles, "entryFiles");

  app.use(express.static(path.resolve(__dirname, "../dist")));

  app.get(`/`, (req, res) => {
    res.send(`Hello World!`);
  });

  entryFiles.forEach((entry) => {
    const entryName = entry.match(/src\/(.*)\/index.ssr.jsx/)[1];

    const baseHtml = fs.readFileSync(
      path.resolve(__dirname, `../dist/${entryName}.html`),
      "utf-8"
    );

    const html = renderToString(
      require(path.resolve(__dirname, `../dist/js/${entryName}.ssr.js`))
    );

    console.log(html, "baseHtml");

    app.get(`/${entryName}`, (req, res) => {
      //   const html = require(`../dist/${entryName}.ssr.html`);
      res.send(createHtml(baseHtml, html));
    });
  });

  app.listen(port, () => {
    console.log(`listen on port ${port}`);
  });
}

start(3001);
