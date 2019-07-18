/**
 * @Author: yeluochen
 * @Date:   2018-03-08T09:10:12+08:00
 * @Email:  yeluochen314@163.com
 * @Last modified by:   yeluochen
 * @Last modified time: 2018-08-11T11:26:56+08:00
 */
module.exports = {
	root: true,
	parserOptions: {
		parser: 'babel-eslint'
	},
	env: {
		"node": true,
		"browser": true,
		"es6": true,
		"jquery": true
	},
	extends: [
		'standard'
	],
	rules: {
		'generator-star-spacing': 'off',
		'semi': ["error", 'always'],
		"indent": "off",
		"no-mixed-spaces-and-tabs" : "off",
		"no-tabs": "off",
		"eol-last": "off",
		"no-trailing-spaces": "off",
		"space-before-function-paren": "off"
	}
}
