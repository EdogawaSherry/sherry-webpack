/*
 * @Author: Ye Luochen
 * @Email: yeluochen314@163.com
 * @Date: 2018-08-11 22:44:14
 * @Last Modified by: YeLuochen
 * @Last Modified time: 2019-07-17 17:14:58
 * @Description: 工具处理
 */
const path = require('path');
const config = require('./config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 静态资源文件+第三方资源存放文件夹名称
const staticDir = process.env.NODE_ENV === 'production' ? config.prod.staticDir : config.dev.staticDir;

// 设置路径
exports.assetsPath = _path => path.posix.join(staticDir, _path);

/**
 * 样式处理 生成样式loader对象，并放入数组里面
 * @param { Object } options 对应config.js里面的对象属性
 * @return { Array }
 */
exports.styleLoader = () => {
    // console.log(option);
    const options = process.env.NODE_ENV === 'production' ? config.prod : config.dev;
    // 两个固定的loader
    const cssLoader = {
        loader: 'css-loader',
        options: {
            sourceMap: options.sourceMap
        }
    };
    const postcssLoader = 'postcss-loader';
    /**
     * 生成{test: xxx, use: xxx}中use的值
     * @param { String } loader loader名 less, scss, sass, stylus 可为空，空默认css
     */
    function generateLoaders(loader) {
        // 加入两个固定loader
        const loaders = [cssLoader, postcssLoader];
        if (loader) {
            // 通过名字加入loader，末端压入数组，感谢loader的执行顺序是从后往前
            loaders.push({
                loader: `${loader}-loader`
            });
        }
        // 生产环境提取样式
        if (process.env.NODE_ENV === 'production') {
            loaders.unshift({
                loader: MiniCssExtractPlugin.loader,
                options: {
                    // 处理css中背景图路径问题
                    publicPath: '../../'
                }
            });
        } else {
            loaders.unshift('style-loader');
        }
        // console.log(loader);
        return loaders;
    }
    // 通过上述函数生成对应的值
    const loaders = {
        css: generateLoaders(),
        less: generateLoaders('less'),
        scss: generateLoaders('sass'),
        sass: generateLoaders('sass'),
        styl: generateLoaders('stylus')
    };
    const output = [];
    // 遍历并加入正则，得到最终的loader
    for (const key in loaders) {
        if (Object.prototype.hasOwnProperty.call(loaders, key)) {
            const loader = loaders[key];
            output.push({
                test: new RegExp(`\\.${key}$`),
                use: loader
            });
        }
    }
    return output;
};
