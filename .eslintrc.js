module.exports = {
	env: {
		commonjs: true,
		es6: true,
		node: true,
	},
	extends: "eslint:recommended",
	globals: {
		Atomics: "readonly",
		SharedArrayBuffer: "readonly",
	},
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: "module",
	},
	rules: {},
};
