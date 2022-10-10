module.exports = {
    parser: "babel-eslint",
    extends: "airbnb",
    env: {
      browser: true,
      node: true,
    },
    rules: {
      "no-console": "off",
      quotes: ["error", "double", { avoidEscape: true }],
      "react/function-component-definition":[2, { "namedComponents": "arrow-function" }]
    },
  };
  
