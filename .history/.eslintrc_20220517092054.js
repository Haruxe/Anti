module.exports = {
    env: {
      browser: false,
      es2021: true,
      mocha: true,
      node: true,
    },
    "extends": [
      "react-hooks",
    ],
    "plugins": [
      "react-hooks"
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
      ecmaVersion: 12,
    },
  };
