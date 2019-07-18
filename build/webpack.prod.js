/*
 * @Author: YeLuochen
 * @Date: 2019-07-17 15:29:42
 * @Last Modified by: YeLuochen
 * @Last Modified time: 2019-07-18 16:23:18
 * @Description: 生产
 */
process.env.NODE_ENV = 'production';
const path = require('path');
const merge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const rm = require('rimraf');
const baseWebpack = require('./webpack.base');
const config = require('./config');
const utils = require('./utils');
const pageConfig = require('./page.config.js');

// 删除
rm(path.join(__dirname, '../dist'), (err) => {
    if (err) throw err;
});
const minimizer = [];
// 需要压缩
if (config.prod.minimize) {
	minimizer.push(
		new UglifyJsPlugin({
			cache: true,
			parallel: true,
			uglifyOptions: {
				compress: {
					drop_console: true,
					reduce_vars: true
				}
			}
		}),
		new OptimizeCSSAssetsPlugin({})
	);
} 

module.exports = new Promise((resolve) => {
	// 异步获取得到多页面的entries入口配置和htmlPlugin插件配置
	pageConfig.readPage().then((pageInfo) => {
		resolve(merge(baseWebpack, {
            entry: pageInfo.entries,
			optimization: {
				splitChunks: {
					// 抽离的时候除了被引用次数大于等于minChunks外，如果抽离出来的大小小于minSize(默认3000B)也不会被抽离
					cacheGroups: {
						commonjs: {
							chunks: 'all',
							name: 'common',
							test: /\.js$/,
							minChunks: 3
							// minSize: 3000
						},
						commoncss: {
							chunks: 'all',
							name: 'common',
							test: /\.(css|scss|styl|less)$/,
							minChunks: 3
						}
					}
				},
				minimizer: [...minimizer]
			},
			plugins: [
				...pageInfo.htmlPlugin,
                new MiniCssExtractPlugin({
					filename: utils.assetsPath('css/[name].[hash].css')
				}),
				new CopyWebpackPlugin([{
					// 源文件目录
					from: path.join(__dirname, '../src/static'),
					// 目标目录 dist目录下
					to: config.prod.staticDir
				}])
			]
		}));
	});
});
