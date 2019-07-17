/*
 * @Author: YeLuochen
 * @Date: 2019-07-17 15:02:14
 * @Last Modified by: YeLuochen
 * @Last Modified time: 2019-07-17 17:27:13
 * @Description: base
 */
const path = require('path');
const utils = require('./utils');
const config = require('./config');

module.exports = {
    stats: {
        // copied from `'minimal'`
        // all: false,
        modules: true,
        maxModules: 0,
        errors: true,
        warnings: true,
        // our additional options
        moduleTrace: true,
        errorDetails: true
    },
    output: {
        path: path.join(__dirname, '../dist'),
        filename: utils.assetsPath('js/[name].[hash].js'),
        publicPath: process.env.NODE_ENV === 'production' ? config.prod.publicPath : config.dev.publicPath
    },
    resolve: {
        extensions: ['.js'],
        alias: {
            'common': path.resolve(__dirname, '../src/common'),
            'tpl': path.resolve(__dirname, '../src/tpl')
        }
    },
    module: {
        rules: [
            ...utils.styleLoader(),
            {
                // 对js文件使用loader
                test: /\.js$/,
                exclude: path.join(__dirname, '../node_modules'),
                // 仅仅解析
                include: path.join(__dirname, '../src'),
                use: 'babel-loader'
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
                options: {
                    // 标签+属性
                    attrs: ['img:src', 'audio:src', 'video:src']
                }
            },
            {
                // 对下列资源文件使用loader
                test: /\.(gif|jpg|jpeg|png|woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader',
                options: {
                    // 小于10kb将会转换成base64
                    limit: 10240,
                    // 大于10kb的资源输出地[name]是名字[ext]后缀
                    name: utils.assetsPath('img/[name].[hash:6].[ext]')
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10240,
                    name: utils.assetsPath('media/[name].[hash:6].[ext]')
                }
            }
        ]
    },
    plugins: [

    ]
}