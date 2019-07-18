/*
 * @Author: YeLuochen
 * @Date: 2019-07-17 15:02:14
 * @Last Modified by: YeLuochen
 * @Last Modified time: 2019-07-18 15:51:37
 * @Description: base
 */
const path = require('path');
const webpack = require('webpack');
const utils = require('./utils');
const config = require('./config');

module.exports = {
    stats: 'minimal',
    output: {
        path: path.join(__dirname, '../dist'),
        filename: utils.assetsPath('js/[name].[hash].js'),
        publicPath: process.env.NODE_ENV === 'production' ? config.prod.publicPath : config.dev.publicPath
    },
    resolve: {
        extensions: ['.js'],
        alias: {
            common: path.resolve(__dirname, '../src/common'),
            tpl: path.resolve(__dirname, '../src/tpl')
        }
    },
    module: {
        rules: [
            ...utils.styleLoader(),
            {
                test: /\.js$/,
                loader: [
                    'babel-loader',
                    {
                        loader: 'eslint-loader',
                        options: {
                            formatter: require('eslint-friendly-formatter'),
                            emitWarning: true
                        }
                    }
                ],
                enforce: 'pre',
                exclude: path.join(__dirname, '../node_modules'),
                include: [path.resolve(__dirname, '../src')]
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
                // 对模版文件使用loader
                test: /\.tpl$/,
                use: 'ejs-loader'
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
            },
            {
                // 通过require('jquery')来引入
                test: require.resolve('jquery'),
                use: [
                    {
                        loader: 'expose-loader',
                        // 暴露出去的全局变量的名称 随便你自定义
                        options: 'jQuery'
                    },
                    {
                        // 同上
                        loader: 'expose-loader',
                        options: '$'
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery'
        })
    ]
};