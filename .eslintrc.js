module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jquery: true
  },
  // extends: "airbnb-base",
  extends: "eslint:recommended",
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true
      // jsx: true
    },
    sourceType: "module"
  },
  // plugins: ["react"], use only with react
  rules: {
    indent: ["error", 2],
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "single"],
    semi: ["error", "always"]
  }
};
