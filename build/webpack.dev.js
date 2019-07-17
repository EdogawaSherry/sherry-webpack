/*
 * @Author: YeLuochen
 * @Date: 2019-07-17 15:09:40
 * @Last Modified by: YeLuochen
 * @Last Modified time: 2019-07-17 17:22:37
 * @Description: 开发环境
 */
process.env.NODE_ENV = 'development';
const baseWebpack = require('./webpack.base');
const merge = require('webpack-merge');
const config = require('./config');
const pageConfig = require('./page.config.js');

module.exports = new Promise((resolve) => {
    // 异步获取得到多页面的entries入口配置和htmlPlugin插件配置
	pageConfig.readPage().then((pageInfo) => {
		resolve(merge(baseWebpack, {
			devtool: config.dev.sourceMap && 'inline-source-map',
			entry: pageInfo.entries,
            devServer: {
		        host: config.dev.host,
				port: config.dev.port
		    },
			plugins: [
				...pageInfo.htmlPlugin
			]
		}));
	});
});